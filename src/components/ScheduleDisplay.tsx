import jsPDF from 'jspdf';
import 'jspdf-autotable';

type Teacher = {
  id: string;
  name: string;
};

type Course = {
  id: string;
  name: string;
  teacherId: string;
};

type Class = {
  id: string;
  name: string;
  roomNumber: string;
};

type ScheduleItem = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseId: string;
  classId: string;
};

type ScheduleDisplayProps = {
  schedule: ScheduleItem[];
  courses: Course[];
  teachers: Teacher[];
  classes: Class[];
  clearSchedule: () => void;
};

// Extend jsPDF to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (columns: string[], rows: string[][], options?: object) => void;
  }
}

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

  return (
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <button onClick={generatePDF} className="px-4 py-2 bg-green-500 text-white rounded">Export to PDF</button>
          <button onClick={clearSchedule} className="px-4 py-2 bg-red-500 text-white rounded">Clear Schedule</button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
          <tr>
            <th className="border p-2">Day/Time</th>
            {days.map(day => (
                <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {Array.from({ length: 18 * 2 }, (_, i) => {
            const hour = Math.floor(i / 2) + 8;
            const minute = i % 2 === 0 ? '00' : '30';
            return `${hour}:${minute}`;
          }).map(time => (
              <tr key={time}>
                <td className="border p-2">{formatTime(time)}</td>
                {days.map(day => {
                  const item = schedule.find(s => s.day === day && s.startTime === time);
                  return (
                      <td key={`${day}-${time}`} className="border p-2">
                        {item && (
                            <div>
                              <div>{getCourseName(item.courseId)}</div>
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
  );
}