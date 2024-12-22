'use server'

// Import revalidatePath to refresh the client-side cache for specified paths.
import { revalidatePath } from 'next/cache'

// Define the structure for a Teacher object.
type Teacher = {
  id: string // Unique identifier for the teacher.
  name: string // Name of the teacher.
}

// Define the structure for a Course object.
type Course = {
  id: string // Unique identifier for the course.
  name: string // Name of the course.
  teacherId: string // ID of the teacher responsible for the course.
}

// Define the structure for a Class object.
type Class = {
  id: string // Unique identifier for the class.
  name: string // Name of the class.
  roomNumber: string // Room number where the class takes place.
}

// Define the structure for a ScheduleItem object.
type ScheduleItem = {
  id: string // Unique identifier for the schedule item.
  day: string // Day of the week for the schedule (e.g., Monday, Tuesday).
  time: string // Time of the class or activity.
  courseId: string // ID of the associated course.
  classId: string // ID of the associated class.
}

// In-memory storage arrays for teachers, courses, classes, and schedule items.
// These arrays reset when the server restarts.
let teachers: Teacher[] = []
let courses: Course[] = []
let classes: Class[] = []
let schedule: ScheduleItem[] = []

/**
 * Adds a new teacher to the system.
 * @param formData - FormData object containing the teacher's name.
 * @returns An object indicating success or failure.
 */
export async function addTeacher(formData: FormData) {
  try {
    const name = formData.get('name') as string // Retrieve the name from formData.
    if (!name) {
      console.error('Teacher name is missing') // Log an error if name is missing.
      return { success: false, error: 'Name is required' }
    }
    const id = Date.now().toString() // Generate a unique ID based on the current timestamp.
    teachers.push({ id, name }) // Add the new teacher to the array.
    console.log('Teacher added successfully:', { id, name }) // Log success.
    revalidatePath('/') // Refresh the client-side cache for the root path.
    return { success: true } // Return success.
  } catch (error) {
    console.error('Error adding teacher:', error) // Log unexpected errors.
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Adds a new class to the system.
 * @param formData - FormData object containing the class name and room number.
 * @returns An object indicating success or failure.
 */
export async function addClass(formData: FormData) {
  try {
    const name = formData.get('name') as string // Retrieve the name from formData.
    const roomNumber = formData.get('roomNumber') as string // Retrieve the room number.
    if (!name || !roomNumber) {
      console.error('Class name or room number is missing') // Log an error if any field is missing.
      return { success: false, error: 'Name and room number are required' }
    }
    const id = Date.now().toString() // Generate a unique ID.
    classes.push({ id, name, roomNumber }) // Add the new class to the array.
    console.log('Class added successfully:', { id, name, roomNumber }) // Log success.
    revalidatePath('/') // Refresh the client-side cache.
    return { success: true }
  } catch (error) {
    console.error('Error adding class:', error) // Log unexpected errors.
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Adds a new course to the system.
 * @param formData - FormData object containing the course name and teacher ID.
 * @returns An object indicating success or failure.
 */
export async function addCourse(formData: FormData) {
  try {
    const name = formData.get('name') as string // Retrieve the course name.
    const teacherId = formData.get('teacherId') as string // Retrieve the teacher ID.
    if (!name || !teacherId) {
      console.error('Course name or teacher ID is missing') // Log an error if any field is missing.
      return { success: false, error: 'Name and teacher are required' }
    }
    const id = Date.now().toString() // Generate a unique ID.
    courses.push({ id, name, teacherId }) // Add the new course to the array.
    console.log('Course added successfully:', { id, name, teacherId }) // Log success.
    revalidatePath('/') // Refresh the client-side cache.
    return { success: true }
  } catch (error) {
    console.error('Error adding course:', error) // Log unexpected errors.
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Adds a new schedule item to the system.
 * @param formData - FormData object containing the schedule details.
 * @returns An object indicating success or failure.
 */
export async function addScheduleItem(formData: FormData) {
  try {
    const day = formData.get('day') as string // Retrieve the day of the week.
    const time = formData.get('time') as string // Retrieve the time.
    const courseId = formData.get('courseId') as string // Retrieve the course ID.
    const classId = formData.get('classId') as string // Retrieve the class ID.
    if (!day || !time || !courseId || !classId) {
      console.error('Schedule item is missing required fields') // Log an error if any field is missing.
      return { success: false, error: 'All fields are required' }
    }
    const id = Date.now().toString() // Generate a unique ID.
    schedule.push({ id, day, time, courseId, classId }) // Add the new schedule item to the array.
    console.log('Schedule item added successfully:', { id, day, time, courseId, classId }) // Log success.
    revalidatePath('/') // Refresh the client-side cache.
    return { success: true }
  } catch (error) {
    console.error('Error adding schedule item:', error) // Log unexpected errors.
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Retrieves all teachers.
 * @returns The array of teachers.
 */
export async function getTeachers() {
  return teachers
}

/**
 * Retrieves all courses.
 * @returns The array of courses.
 */
export async function getCourses() {
  return courses
}

/**
 * Retrieves all classes.
 * @returns The array of classes.
 */
export async function getClasses() {
  return classes
}

/**
 * Retrieves the schedule.
 * @returns The array of schedule items.
 */
export async function getSchedule() {
  return schedule
}
