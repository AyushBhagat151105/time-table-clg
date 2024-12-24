import { useState } from 'react';
import { deleteTeacher, deleteCourse, deleteClass, deleteScheduleItem } from '../app/actions';

type DeleteFormProps = {
    teachers: { id: string; name: string }[];
    courses: { id: string; name: string }[];
    classes: { id: string; name: string }[];
    schedule: { id: string; day: string; startTime: string; endTime: string }[];
    onDelete: () => void;
};

export default function DeleteForm({ teachers, courses, classes, schedule, onDelete }: DeleteFormProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (deleteFunction: (id: string) => Promise<{ success: boolean }>, id: string) => {
        if (!id) {
            alert('Invalid ID');
            return;
        }

        setLoading(true);
        const result = await deleteFunction(id);
        if (result.success) {
            onDelete();
        } else {
            alert('Failed to delete item.');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Delete Items</h2>
            <div>
                <h3 className="font-semibold text-lg mb-2">Teachers</h3>
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-2 border-b">
                        <span>{teacher.name}</span>
                        <button onClick={() => handleDelete(deleteTeacher, teacher.id)} className="text-red-500 hover:text-red-700" disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Courses</h3>
                {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-2 border-b">
                        <span>{course.name}</span>
                        <button onClick={() => handleDelete(deleteCourse, course.id)} className="text-red-500 hover:text-red-700" disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Classes</h3>
                {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-2 border-b">
                        <span>{classItem.name}</span>
                        <button onClick={() => handleDelete(deleteClass, classItem.id)} className="text-red-500 hover:text-red-700" disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Schedule Items</h3>
                {schedule.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b">
                        <span>{item.day} {item.startTime} - {item.endTime}</span>
                        <button onClick={() => handleDelete(deleteScheduleItem, item.id)} className="text-red-500 hover:text-red-700" disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}