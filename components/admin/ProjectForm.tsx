"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project";
import { createProject, updateProject } from "@/app/actions/projectActions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
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

  const inputClasses = "mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0e0e1b] text-slate-900 dark:text-white p-2.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-slate-400";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm max-w-2xl">
        <div className="grid gap-5">
          {/* Title */}
          <div>
            <label className={labelClasses}>Project Title</label>
            <input
              {...register("title")}
              placeholder="e.g. E-Commerce Platform"
              className={inputClasses}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe what the project does, problems solved, and features..."
              className={inputClasses}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClasses}>Image URL</label>
            <input
              {...register("imageUrl")}
              placeholder="https://example.com/image.png"
              className={inputClasses}
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
          </div>

          {/* Tech Stack */}
          <div>
            <label className={labelClasses}>Tech Stack (comma separated)</label>
            <input
              {...register("techStack")}
              placeholder="React, Next.js, TypeScript, Tailwind"
              className={inputClasses}
            />
            {errors.techStack && <p className="text-red-500 text-sm mt-1">{errors.techStack.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live URL */}
            <div>
              <label className={labelClasses}>Live URL (Optional)</label>
              <input
                {...register("liveUrl")}
                placeholder="https://myproject.com"
                className={inputClasses}
              />
              {errors.liveUrl && <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>}
            </div>

            {/* Github URL */}
            <div>
              <label className={labelClasses}>GitHub URL (Optional)</label>
              <input
                {...register("githubUrl")}
                placeholder="https://github.com/username/repo"
                className={inputClasses}
              />
              {errors.githubUrl && <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer">
              Mark as Featured Project (will show on Homepage preview)
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-opacity cursor-pointer"
        >
          {isPending ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </button>
      </form>
    </>
  );
}
