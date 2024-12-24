"use client";
import { useEffect, useState } from 'react';
import { getTeachers, getCourses, getClasses, getSchedule, addTeacher, addCourse, addClass, addScheduleItem } from '../app/actions';
import SchedulerForm from "@/components/SchedulerForm";
import ScheduleDisplay from "@/components/ScheduleDisplay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForm from "@/components/DeleteForm";

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

export default function Home() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const teachersData = await getTeachers();
            const coursesData = await getCourses();
            const classesData = await getClasses();
            const scheduleData = await getSchedule();
            setTeachers(teachersData);
            setCourses(coursesData);
            setClasses(classesData);
            setSchedule(scheduleData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleAddTeacher = async (formData: FormData) => {
        setLoading(true);
        const result = await addTeacher(formData);
        if (result.success) {
            setTeachers(await getTeachers());
            toast.success('Teacher added successfully!');
        } else {
            toast.error(result.error || 'Failed to add teacher.');
        }
        setLoading(false);
    };

    const handleAddCourse = async (formData: FormData) => {
        setLoading(true);
        const result = await addCourse(formData);
        if (result.success) {
            setCourses(await getCourses());
            toast.success('Course added successfully!');
        } else {
            toast.error(result.error || 'Failed to add course.');
        }
        setLoading(false);
    };

    const handleAddClass = async (formData: FormData) => {
        setLoading(true);
        const result = await addClass(formData);
        if (result.success) {
            setClasses(await getClasses());
            toast.success('Class added successfully!');
        } else {
            toast.error(result.error || 'Failed to add class.');
        }
        setLoading(false);
    };

    const handleAddScheduleItem = async (formData: FormData) => {
        setLoading(true);
        const result = await addScheduleItem(formData);
        if (result.success) {
            setSchedule(await getSchedule());
            toast.success('Schedule item added successfully!');
        } else {
            toast.error(result.error || 'Failed to add schedule item.');
        }
        setLoading(false);
    };

    const clearSchedule = () => {
        setSchedule([]);
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-1">College Scheduler</h1>
            <p className="mb-4 font-extrabold">Developed by Ayush Bhagat🔪</p>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SchedulerForm
                        teachers={teachers}
                        courses={courses}
                        classes={classes}
                        onAddTeacher={handleAddTeacher}
                        onAddCourse={handleAddCourse}
                        onAddClass={handleAddClass}
                        onAddScheduleItem={handleAddScheduleItem}
                    />
                    <DeleteForm
                        teachers={teachers}
                        courses={courses}
                        classes={classes}
                        schedule={schedule}
                        onDelete={async () => {
                            setTeachers(await getTeachers());
                            setCourses(await getCourses());
                            setClasses(await getClasses());
                            setSchedule(await getSchedule());
                        }}
                    />
                    <ScheduleDisplay
                        schedule={schedule}
                        courses={courses}
                        teachers={teachers}
                        classes={classes}
                        clearSchedule={clearSchedule}
                    />

                </div>
            )}
        </div>
    );
}