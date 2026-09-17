"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project";
import { createProject, updateProject } from "@/app/actions/projectActions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id: number };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      imageUrl: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    startTransition(async () => {
      if (initialData) {
        const res = await updateProject(initialData.id, data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Project updated successfully!");
        }
      } else {
        const res = await createProject(data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Project created successfully!");
        }
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" />
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-md max-w-2xl">
      <div className="grid gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register("title")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            {...register("imageUrl")}
            placeholder="https://example.com/image.png"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
          <input
            {...register("techStack")}
            placeholder="React, Next.js, Tailwind"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Live URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Live URL (Optional)</label>
            <input
              {...register("liveUrl")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.liveUrl && <p className="text-red-500 text-sm">{errors.liveUrl.message}</p>}
          </div>

          {/* Github URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
            <input
              {...register("githubUrl")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.githubUrl && <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>}
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("featured")}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 block text-sm text-gray-900">Featured Project</label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? "Saving..." : initialData ? "Update Project" : "Create Project"}
      </button>
    </form>
    </>
  );
}
