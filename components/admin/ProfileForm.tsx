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

  const inputClasses = "mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0e0e1b] text-slate-900 dark:text-white p-2.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-slate-400";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm max-w-2xl">
      <input type="hidden" {...register("id")} />
      
      <div className="grid gap-5">
        {/* Name */}
        <div>
          <label className={labelClasses}>Full Name</label>
          <input
            {...register("name")}
            placeholder="Your name"
            className={inputClasses}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClasses}>Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="admin@example.com"
            className={inputClasses}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Profile Image URL */}
        <div>
          <label className={labelClasses}>Profile Image Path or URL</label>
          <input
            {...register("image")}
            placeholder="/Profile.png or https://example.com/photo.jpg"
            className={inputClasses}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Change Password</h3>
            
            {/* Current Password */}
            <div className="mb-4">
              <label className={labelClasses}>Current Password (Required to make changes)</label>
              <input
                {...register("currentPassword")}
                type="password"
                placeholder="••••••••"
                className={inputClasses}
              />
              {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
            </div>

            {/* New Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>New Password (Optional)</label>
                <input
                  {...register("newPassword")}
                  type="password"
                  placeholder="Leave blank to keep current"
                  className={inputClasses}
                />
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Confirm New Password</label>
                <input
                  {...register("confirmNewPassword")}
                  type="password"
                  placeholder="Repeat new password"
                  className={inputClasses}
                />
                {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
              </div>
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-opacity cursor-pointer"
      >
        {isPending ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
