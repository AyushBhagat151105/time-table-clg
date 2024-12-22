'use server'

import { revalidatePath } from 'next/cache'

type Teacher = {
  id: string
  name: string
}

type Course = {
  id: string
  name: string
  teacherId: string
}

type Class = {
  id: string
  name: string
  roomNumber: string
}

type ScheduleItem = {
  id: string
  day: string
  startTime: string
  endTime: string
  courseId: string
  classId: string
}

let teachers: Teacher[] = []
let courses: Course[] = []
let classes: Class[] = []
let schedule: ScheduleItem[] = []

export async function addTeacher(formData: FormData) {
  try {
    const name = formData.get('name') as string
    if (!name) {
      console.error('Teacher name is missing')
      return { success: false, error: 'Name is required' }
    }
    const id = Date.now().toString()
    teachers.push({ id, name })
    console.log('Teacher added successfully:', { id, name })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error adding teacher:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function addClass(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const roomNumber = formData.get('roomNumber') as string
    if (!name || !roomNumber) {
      console.error('Class name or room number is missing')
      return { success: false, error: 'Name and room number are required' }
    }
    const id = Date.now().toString()
    classes.push({ id, name, roomNumber })
    console.log('Class added successfully:', { id, name, roomNumber })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error adding class:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function addCourse(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const teacherId = formData.get('teacherId') as string
    if (!name || !teacherId) {
      console.error('Course name or teacher ID is missing')
      return { success: false, error: 'Name and teacher are required' }
    }
    const id = Date.now().toString()
    courses.push({ id, name, teacherId })
    console.log('Course added successfully:', { id, name, teacherId })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error adding course:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function addScheduleItem(formData: FormData) {
  try {
    const day = formData.get('day') as string
    const startTime = formData.get('startTime') as string
    const endTime = formData.get('endTime') as string
    const courseId = formData.get('courseId') as string
    const classId = formData.get('classId') as string
    if (!day || !startTime || !endTime || !courseId || !classId) {
      console.error('Schedule item is missing required fields')
      return { success: false, error: 'All fields are required' }
    }
    const id = Date.now().toString()
    schedule.push({ id, day, startTime, endTime, courseId, classId })
    console.log('Schedule item added successfully:', { id, day, startTime, endTime, courseId, classId })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error adding schedule item:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getTeachers() {
  return teachers
}

export async function getCourses() {
  return courses
}

export async function getClasses() {
  return classes
}

export async function getSchedule() {
  return schedule
}