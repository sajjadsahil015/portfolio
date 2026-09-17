"use server";

import prisma from "@/lib/prisma";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project";
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

export async function createProject(data: ProjectFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = projectSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.project.create({
      data: validatedFields.data,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to create project.",
    };
  }

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: number, data: ProjectFormValues) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  const validatedFields = projectSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: validatedFields.data,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Failed to update project.",
    };
  }

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  try {
    await requireAdmin();
  } catch (authError: any) {
    return { error: authError.message || "Unauthorized" };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to delete project.",
    };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectById(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}
