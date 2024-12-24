"use client";
import { useEffect, useState } from 'react';
import { getTeachers, getCourses, getClasses, getSchedule, addTeacher, addCourse, addClass, addScheduleItem } from '../app/actions';
import SchedulerForm from "@/components/SchedulerForm";
import ScheduleDisplay from "@/components/ScheduleDisplay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        async function fetchData() {
            const teachersData = await getTeachers();
            const coursesData = await getCourses();
            const classesData = await getClasses();
            const scheduleData = await getSchedule();
            setTeachers(teachersData);
            setCourses(coursesData);
            setClasses(classesData);
            setSchedule(scheduleData);
        }
        fetchData();
    }, []);

    const handleAddTeacher = async (formData: FormData) => {
        const result = await addTeacher(formData);
        if (result.success) {
            setTeachers(await getTeachers());
            toast.success('Teacher added successfully!');
        } else {
            toast.error(result.error || 'Failed to add teacher.');
        }
    };

    const handleAddCourse = async (formData: FormData) => {
        const result = await addCourse(formData);
        if (result.success) {
            setCourses(await getCourses());
            toast.success('Course added successfully!');
        } else {
            toast.error(result.error || 'Failed to add course.');
        }
    };

    const handleAddClass = async (formData: FormData) => {
        const result = await addClass(formData);
        if (result.success) {
            setClasses(await getClasses());
            toast.success('Class added successfully!');
        } else {
            toast.error(result.error || 'Failed to add class.');
        }
    };

    const handleAddScheduleItem = async (formData: FormData) => {
        const result = await addScheduleItem(formData);
        if (result.success) {
            setSchedule(await getSchedule());
            toast.success('Schedule item added successfully!');
        } else {
            toast.error(result.error || 'Failed to add schedule item.');
        }
    };

    const clearSchedule = () => {
        setSchedule([]);
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-1">College Scheduler</h1>
            <p className="mb-4 font-extrabold">Developed by Ayush Bhagat🔪</p>
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
                <ScheduleDisplay
                    schedule={schedule}
                    courses={courses}
                    teachers={teachers}
                    classes={classes}
                    clearSchedule={clearSchedule}
                />
            </div>
        </div>
    );
}