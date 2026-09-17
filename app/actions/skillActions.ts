"use server";

import prisma from "@/lib/prisma";
import { skillSchema, SkillFormValues } from "@/lib/validations/skill";
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

export async function createSkill(data: SkillFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = skillSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.skill.create({
      data: validatedFields.data,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to create skill.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: number, data: SkillFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = skillSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.skill.update({
      where: { id },
      data: validatedFields.data,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to update skill.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: number) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  try {
    await prisma.skill.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to delete skill.",
    };
  }
}

export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return skills;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

export async function getSkillById(id: number) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });
    return skill;
  } catch (error) {
    console.error("Failed to fetch skill:", error);
    return null;
  }
}
