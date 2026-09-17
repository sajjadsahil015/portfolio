"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function createUser(data: z.infer<typeof userSchema>) {
  const validatedFields = userSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields for user creation." };
  }

  const { email, password, name } = validatedFields.data;

  try {
    const existingCount = await prisma.user.count();
    // The very first user is admin; all subsequent registrations are normal users
    const role = existingCount === 0 ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });
    return { success: `User ${user.email} created successfully!` };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Email might already be in use." };
  }
}

const updateProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  image: z.string().optional(),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().optional(),
});

export async function updateUserProfile(data: z.infer<typeof updateProfileSchema>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: "Unauthorized. Please sign in." };
  }

  if (session.user.id !== data.id && session.user.role !== "admin") {
    return { error: "Forbidden. You can only update your own profile." };
  }

  const validatedFields = updateProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { id, name, email, image, currentPassword, newPassword } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || !user.password) {
      return { error: "User not found." };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return { error: "Incorrect current password." };
    }

    const updateData: any = {
      name,
      email,
      image: image || null,
    };

    if (newPassword && newPassword.length >= 6) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    } else if (newPassword && newPassword.length < 6) {
      return { error: "New password must be at least 6 characters long." };
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return { success: "Profile updated successfully!" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile." };
  }
}

export async function getAdminUser() {
  try {
    const user = await prisma.user.findFirst({
      where: { role: "admin" },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return null;
  }
}
