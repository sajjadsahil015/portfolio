"use server";

import prisma from "@/lib/prisma";
import { contactSchema, ContactFormValues } from "@/lib/validations/contact";
import { revalidatePath } from "next/cache";

export async function createMessage(data: ContactFormValues) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.message.create({
      data: validatedFields.data,
    });
    
    // Revalidate admin messages page
    revalidatePath("/admin/messages");
    
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to send message. Please try again later.",
    };
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized: Admin privileges required.");
  }
  return session;
}

export async function markMessageAsRead(id: number) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  try {
    await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update message." };
  }
}

export async function deleteMessage(id: number) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete message." };
  }
}
