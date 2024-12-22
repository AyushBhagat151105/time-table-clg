// Define the structure for a Teacher object with id and name properties
type Teacher = {
  id: string // Unique identifier for the teacher
  name: string // Name of the teacher
}

// Define the structure for a Course object with id, name, and teacherId properties
type Course = {
  id: string // Unique identifier for the course
  name: string // Name of the course
  teacherId: string // ID of the teacher assigned to this course
}

// Define the structure for a Class object with id, name, and roomNumber properties
type Class = {
  id: string // Unique identifier for the class
  name: string // Name of the class
  roomNumber: string // Room number where the class is held
}

// Define the structure for a ScheduleItem object with id, day, time, courseId, and classId properties
type ScheduleItem = {
  id: string // Unique identifier for the schedule item
  day: string // Day of the week (e.g., Monday, Tuesday)
  time: string // Time of the class (e.g., "10:00")
  courseId: string // ID of the course being held
  classId: string // ID of the class where the course is held
}

// Define the props structure for the ScheduleDisplay component
type ScheduleDisplayProps = {
  schedule: ScheduleItem[] // Array of schedule items to be displayed
  courses: Course[] // Array of all courses
  teachers: Teacher[] // Array of all teachers
  classes: Class[] // Array of all classes
}

// ScheduleDisplay component renders the schedule in a table format
export default function ScheduleDisplay({ schedule, courses, teachers, classes }: ScheduleDisplayProps) {
  // List of days to display in the schedule table
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Function to get the course name based on the courseId
  const getCourseName = (courseId: string) => {
    // Find the course matching the provided ID
    const course = courses.find(c => c.id === courseId)
    // Return the course name or 'Unknown Course' if not found
    return course ? course.name : 'Unknown Course'
  }

  // Function to get the teacher's name for a given courseId
  const getTeacherName = (courseId: string) => {
    // Find the course matching the provided ID
    const course = courses.find(c => c.id === courseId)
    if (course) {
      // Find the teacher assigned to the course
      const teacher = teachers.find(t => t.id === course.teacherId)
      // Return the teacher's name or 'Unknown Teacher' if not found
      return teacher ? teacher.name : 'Unknown Teacher'
    }
    return 'Unknown Teacher'
  }

  // Function to get the class name and room number based on the classId
  const getClassName = (classId: string) => {
    // Find the class matching the provided ID
    const classItem = classes.find(c => c.id === classId)
    // Return the class name and room number or 'Unknown Class' if not found
    return classItem ? `${classItem.name} (Room ${classItem.roomNumber})` : 'Unknown Class'
  }

  // Render the schedule table
  return (
      <div className="overflow-x-auto">
        {/* Table to display the schedule */}
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table header */}
          <thead>
          <tr>
            {/* First column header for Day/Time */}
            <th className="border p-2">Day/Time</th>
            {/* Headers for each day of the week */}
            {days.map(day => (
                <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
          </thead>
          {/* Table body */}
          <tbody>
          {/* Loop through each hour of the day (24-hour format) */}
          {Array.from({ length: 24 }, (_, hour) => (
              <tr key={hour}>
                {/* First column for the time slot (e.g., "08:00") */}
                <td className="border p-2">{`${hour.toString().padStart(2, '0')}:00`}</td>
                {/* Columns for each day of the week */}
                {days.map(day => {
                  // Find the schedule item matching the current day and hour
                  const item = schedule.find(s => s.day === day && parseInt(s.time.split(':')[0]) === hour)
                  return (
                      <td key={`${day}-${hour}`} className="border p-2">
                        {/* If a schedule item exists, display its details */}
                        {item && (
                            <div>
                              {/* Display the course name */}
                              <div>{getCourseName(item.courseId)}</div>
                              {/* Display the teacher's name */}
                              <div className="text-sm text-gray-500">{getTeacherName(item.courseId)}</div>
                              {/* Display the class name and room number */}
                              <div className="text-sm text-gray-500">{getClassName(item.classId)}</div>
                            </div>
                        )}
                      </td>
                  )
                })}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  )
}
