"use server";

import prisma from "@/lib/prisma";
import { experienceSchema, ExperienceFormValues } from "@/lib/validations/experience";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized: Admin privileges required.");
  }
  return session;
}

export async function createExperience(data: ExperienceFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = experienceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { startDate, endDate, ...rest } = validatedFields.data;

  try {
    await prisma.experience.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to create experience.",
    };
  }

  revalidatePath("/about");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: number, data: ExperienceFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = experienceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { startDate, endDate, ...rest } = validatedFields.data;

  try {
    await prisma.experience.update({
      where: { id },
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to update experience.",
    };
  }

  revalidatePath("/about");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: number) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  try {
    await prisma.experience.delete({
      where: { id },
    });
    revalidatePath("/about");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to delete experience.",
    };
  }
}
