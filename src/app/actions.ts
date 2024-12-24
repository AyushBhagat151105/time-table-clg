'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function addTeacher(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    if (!name) {
      return { success: false, error: 'Name is required' };
    }
    await prisma.teacher.create({ data: { name } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding teacher:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function addClass(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const roomNumber = formData.get('roomNumber') as string;
    if (!name || !roomNumber) {
      return { success: false, error: 'Name and room number are required' };
    }
    await prisma.class.create({ data: { name, roomNumber } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding class:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function addCourse(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const teacherId = formData.get('teacherId') as string;
    if (!name || !teacherId) {
      return { success: false, error: 'Name and teacher are required' };
    }
    await prisma.course.create({ data: { name, teacherId } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding course:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function addScheduleItem(formData: FormData) {
  try {
    const day = formData.get('day') as string;
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;
    const courseId = formData.get('courseId') as string;
    const classId = formData.get('classId') as string;
    if (!day || !startTime || !endTime || !courseId || !classId) {
      return { success: false, error: 'All fields are required' };
    }
    await prisma.scheduleItem.create({ data: { day, startTime, endTime, courseId, classId } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error adding schedule item:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deleteTeacher(id: string) {
  if (!id) {
    console.error('Error deleting teacher: id is null or undefined');
    return { success: false, error: 'Invalid teacher ID' };
  }

  try {
    // Find all courses related to the teacher
    const courses = await prisma.course.findMany({ where: { teacherId: id } });

    // Delete related schedule items for each course
    for (const course of courses) {
      await prisma.scheduleItem.deleteMany({ where: { courseId: course.id } });
    }

    // Delete related courses
    await prisma.course.deleteMany({ where: { teacherId: id } });

    // Delete the teacher
    await prisma.teacher.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deleteCourse(id: string) {
  if (!id) {
    console.error('Error deleting course: id is null or undefined');
    return { success: false, error: 'Invalid course ID' };
  }

  try {
    // Delete related schedule items first
    await prisma.scheduleItem.deleteMany({ where: { courseId: id } });

    // Delete the course
    await prisma.course.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting course:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deleteClass(id: string) {
  if (!id) {
    console.error('Error deleting class: id is null or undefined');
    return { success: false, error: 'Invalid class ID' };
  }

  try {
    await prisma.class.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting class:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function deleteScheduleItem(id: string) {
  if (!id) {
    console.error('Error deleting schedule item: id is null or undefined');
    return { success: false, error: 'Invalid schedule item ID' };
  }

  try {
    await prisma.scheduleItem.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting schedule item:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
export async function getTeachers() {
  return await prisma.teacher.findMany();
}

export async function getCourses() {
  return await prisma.course.findMany();
}

export async function getClasses() {
  return await prisma.class.findMany();
}

export async function getSchedule() {
  try {
    const scheduleItems = await prisma.scheduleItem.findMany({
      include: {
        class: true,
        course: {
          include: {
            teacher: true,
          },
        },
      },
    });
    return scheduleItems;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return [];
  }
}