"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserProfile } from "@/app/actions/userActions";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().optional(),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword.length < 6) {
    return false;
  }
  return true;
}, {
  message: "New password must be at least 6 characters long",
  path: ["newPassword"],
}).refine((data) => {
  if (data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Form submitting data:", data); // Client-side debug log
    startTransition(async () => {
      const result = await updateUserProfile({
        id: data.id,
        name: data.name,
        email: data.email,
        image: data.image,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated successfully!");
        // Clear password fields on success
        reset({
            ...data,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-md max-w-2xl">
      <input type="hidden" {...register("id")} />
      
      <div className="grid gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("name")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Profile Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
          <input
            {...register("image")}
            placeholder="https://example.com/photo.jpg"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <div className="border-t border-gray-200 my-4 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
            
            {/* Current Password */}
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Password (Required)</label>
            <input
                {...register("currentPassword")}
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
            </div>

            {/* New Password */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        {...register("newPassword")}
                        type="password"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        {...register("confirmNewPassword")}
                        type="password"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
                </div>
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
