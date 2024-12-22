// Import necessary modules and components
import { Suspense } from 'react'; // Suspense is used to handle the loading state of components
import { getTeachers, getCourses, getClasses, getSchedule } from './actions'; // Import asynchronous data-fetching functions
import SchedulerForm from "@/components/SchedulerForm"; // Import the form component for scheduling
import ScheduleDisplay from "@/components/ScheduleDisplay"; // Import the component for displaying the schedule

// Define the main Home function, which is an async server-side React component
export default async function Home() {
    // Fetch data asynchronously for teachers, courses, classes, and the schedule
    const teachers = await getTeachers(); // Fetch teacher data
    const courses = await getCourses();   // Fetch course data
    const classes = await getClasses();   // Fetch class data
    const schedule = await getSchedule(); // Fetch schedule data

    // Render the UI
    return (
        <div className="container mx-auto p-4"> {/* Container with padding and centered layout */}
            <h1 className="text-2xl font-bold mb-4">
                College Teacher 6-Day Scheduler {/* Main header for the page */}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> {/* Responsive grid layout */}
                {/* SchedulerForm component wrapped in Suspense for loading fallback */}
                <Suspense fallback={<div>Loading form...</div>}>
                    <SchedulerForm
                        teachers={teachers}
                        courses={courses}
                        classes={classes}
                    />
                </Suspense>
                {/* ScheduleDisplay component wrapped in Suspense for loading fallback */}
                <Suspense fallback={<div>Loading schedule...</div>}>
                    <ScheduleDisplay
                        schedule={schedule}
                        courses={courses}
                        teachers={teachers}
                        classes={classes}
                    />
                </Suspense>
            </div>
        </div>
    );
}
