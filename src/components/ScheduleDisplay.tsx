import jsPDF from 'jspdf';
import 'jspdf-autotable';

type ScheduleDisplayProps = {
  schedule: {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    courseId: string;
    classId: string;
  }[];
  courses: {
    id: string;
    name: string;
    teacherId: string;
  }[];
  teachers: {
    id: string;
    name: string;
  }[];
  classes: {
    id: string;
    name: string;
    roomNumber: string;
  }[];
  clearSchedule: () => void;
};

export default function ScheduleDisplay({ schedule, courses, teachers, classes, clearSchedule }: ScheduleDisplayProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  const getTeacherName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const teacher = teachers.find(t => t.id === course.teacherId);
      return teacher ? teacher.name : 'Unknown Teacher';
    }
    return 'Unknown Teacher';
  };

  const getClassName = (classId: string) => {
    const classItem = classes.find(c => c.id === classId);
    return classItem ? `${classItem.name} (Room ${classItem.roomNumber})` : 'Unknown Class';
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Day', 'Time', 'Course', 'Teacher', 'Class'];
    const tableRows: string[][] = [];

    schedule.forEach(item => {
      const courseName = getCourseName(item.courseId);
      const teacherName = getTeacherName(item.courseId);
      const className = getClassName(item.classId);
      const time = `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`;
      tableRows.push([item.day, time, courseName, teacherName, className]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Schedule', 14, 15);
    doc.save('schedule.pdf');
  };

  const groupedSchedules = classes.map(classItem => ({
    class: classItem,
    schedule: schedule.filter(item => item.classId === classItem.id)
  }));

  return (
      <div className="overflow-x-auto w-max">
        <div className="flex justify-between mb-4">
          <button onClick={generatePDF} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Export to PDF</button>
          <button onClick={clearSchedule} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Clear Schedule</button>
        </div>
        {groupedSchedules.map(({ class: classItem, schedule }) => (
            <div key={classItem.id} className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 mb-4">{classItem.name} (Room {classItem.roomNumber})</h2>
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg table-fixed">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border p-2 w-20">Day/Time</th>
                  {days.map(day => (
                      <th key={day} className="border p-2 w-40">{day}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({length: (16 - 8) * 2}, (_, i) => {
                  const hour = Math.floor(i / 2) + 8; // Start from 8 AM
                  const minute = i % 2 === 0 ? '00' : '30';
                  return `${hour.toString().padStart(2, '0')}:${minute}`;
                }).map(time => (
                    <tr key={time} className="hover:bg-gray-100">
                      <td className="border p-2 text-center font-semibold">{formatTime(time)}</td>
                      {days.map(day => {
                        const item = schedule.find(s => s.day === day && s.startTime === time);
                        return (
                            <td key={`${day}-${time}`} className="border p-2 text-center">
                              {item && (
                                  <div className="space-y-1">
                                    <div className="font-semibold text-green-600">{getCourseName(item.courseId)}</div>
                                    <div className="text-sm text-gray-500">{getTeacherName(item.courseId)}</div>
                                    <div className="text-sm text-gray-500">{getClassName(item.classId)}</div>
                                    <div className="text-sm text-gray-500">
                                      {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                    </div>
                                  </div>
                              )}
                            </td>
                        );
                      })}
                    </tr>
                ))}
                </tbody>

              </table>
            </div>
        ))}
      </div>
  );
}