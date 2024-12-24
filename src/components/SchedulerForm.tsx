'use client';

import { useState } from 'react';

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

type SchedulerFormProps = {
    teachers?: Teacher[];
    courses?: Course[];
    classes?: Class[];
    onAddTeacher: (formData: FormData) => void;
    onAddCourse: (formData: FormData) => void;
    onAddClass: (formData: FormData) => void;
    onAddScheduleItem: (formData: FormData) => void;
};

export default function SchedulerForm({ teachers = [], courses = [], classes = [], onAddTeacher, onAddCourse, onAddClass, onAddScheduleItem }: SchedulerFormProps) {
    const [activeForm, setActiveForm] = useState<'teacher' | 'course' | 'class' | 'schedule'>('teacher');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, callback: (formData: FormData) => void) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        await callback(formData);
        setLoading(false);
    };

    return (
        <div className="space-y-4">
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

            {activeForm === 'teacher' && (
                <form onSubmit={(e) => handleSubmit(e, onAddTeacher)} className="space-y-2">
                    <input type="text" name="name" placeholder="Teacher Name" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Teacher'}
                    </button>
                </form>
            )}

            {activeForm === 'course' && (
                <form onSubmit={(e) => handleSubmit(e, onAddCourse)} className="space-y-2">
                    <input type="text" name="name" placeholder="Course Name" className="w-full p-2 border rounded" required />
                    <select name="teacherId" className="w-full p-2 border rounded" required>
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Course'}
                    </button>
                </form>
            )}

            {activeForm === 'class' && (
                <form onSubmit={(e) => handleSubmit(e, onAddClass)} className="space-y-2">
                    <input type="text" name="name" placeholder="Class Name" className="w-full p-2 border rounded" required />
                    <input type="text" name="roomNumber" placeholder="Room Number" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Class'}
                    </button>
                </form>
            )}

            {activeForm === 'schedule' && (
                <form onSubmit={(e) => handleSubmit(e, onAddScheduleItem)} className="space-y-2">
                    <select name="day" className="w-full p-2 border rounded" required>
                        <option value="">Select Day</option>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <input type="time" name="startTime" className="w-full p-2 border rounded" required />
                    <input type="time" name="endTime" className="w-full p-2 border rounded" required />
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
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Schedule Item'}
                    </button>
                </form>
            )}
        </div>
    );
}