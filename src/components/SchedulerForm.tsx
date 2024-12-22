'use client'; // This directive indicates the component is client-side rendered.

import { useState } from 'react'; // Import useState for managing state within the component.
import { addTeacher, addCourse, addClass, addScheduleItem } from '@/app/actions'; // Import functions to handle adding teachers, courses, classes, and schedule items.

// Define TypeScript types for data structures.
type Teacher = {
    id: string; // Unique ID for the teacher.
    name: string; // Name of the teacher.
};

type Course = {
    id: string; // Unique ID for the course.
    name: string; // Name of the course.
    teacherId: string; // ID of the teacher associated with the course.
};

type Class = {
    id: string; // Unique ID for the class.
    name: string; // Name of the class.
    roomNumber: string; // Room number of the class.
};

type SchedulerFormProps = {
    teachers?: Teacher[]; // Array of teacher objects (optional).
    courses?: Course[]; // Array of course objects (optional).
    classes?: Class[]; // Array of class objects (optional).
};

export default function SchedulerForm({ teachers = [], courses = [], classes = [] }: SchedulerFormProps) {
    // Manage the active form (teacher, course, class, or schedule).
    const [activeForm, setActiveForm] = useState<'teacher' | 'course' | 'class' | 'schedule'>('teacher');

    // Render the form based on the selected active form.
    return (
        <div className="space-y-4">
            {/* Buttons to switch between different forms */}
            <div className="flex flex-wrap gap-2">
                {['teacher', 'course', 'class', 'schedule'].map((form) => (
                    <button
                        key={form}
                        onClick={() => setActiveForm(form as 'teacher' | 'course' | 'class' | 'schedule')}
                        className={`px-4 py-2 rounded ${activeForm === form ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Add {form.charAt(0).toUpperCase() + form.slice(1)}
                    </button>
                ))}
            </div>

            {/* Form for adding a teacher */}
            {activeForm === 'teacher' && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        addTeacher(formData);
                    }}
                    className="space-y-2"
                >
                    <input type="text" name="name" placeholder="Teacher Name" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Add Teacher
                    </button>
                </form>
            )}

            {/* Form for adding a course */}
            {activeForm === 'course' && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        addCourse(formData);
                    }}
                    className="space-y-2"
                >
                    <input type="text" name="name" placeholder="Course Name" className="w-full p-2 border rounded" required />
                    <select name="teacherId" className="w-full p-2 border rounded" required>
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Add Course
                    </button>
                </form>
            )}

            {/* Form for adding a class */}
            {activeForm === 'class' && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        addClass(formData);
                    }}
                    className="space-y-2"
                >
                    <input type="text" name="name" placeholder="Class Name" className="w-full p-2 border rounded" required />
                    <input type="text" name="roomNumber" placeholder="Room Number" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Add Class
                    </button>
                </form>
            )}

            {/* Form for adding a schedule item */}
            {activeForm === 'schedule' && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        addScheduleItem(formData);
                    }}
                    className="space-y-2"
                >
                    <select name="day" className="w-full p-2 border rounded" required>
                        <option value="">Select Day</option>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <input type="time" name="time" className="w-full p-2 border rounded" required />
                    <select name="courseId" className="w-full p-2 border rounded" required>
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    <select name="classId" className="w-full p-2 border rounded" required>
                        <option value="">Select Class</option>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.name} - Room {classItem.roomNumber}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Add Schedule Item
                    </button>
                </form>
            )}
        </div>
    );
}
