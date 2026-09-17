"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, SkillFormValues } from "@/lib/validations/skill";
import { createSkill, updateSkill } from "@/app/actions/skillActions";
import { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

interface SkillFormProps {
  initialData?: SkillFormValues & { id: number };
}

export default function SkillForm({ initialData }: SkillFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || {
      name: "",
      category: "Frontend",
      iconUrl: "",
      proficiency: undefined,
    },
  });

  const onSubmit = async (data: SkillFormValues) => {
    startTransition(async () => {
      if (initialData) {
        const res = await updateSkill(initialData.id, data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Skill updated successfully!");
        }
      } else {
        const res = await createSkill(data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Skill added successfully!");
        }
      }
    });
  };

  const inputClasses = "mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0e0e1b] text-slate-900 dark:text-white p-2.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-slate-400";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm max-w-lg">
        <div className="grid gap-5">
          {/* Name */}
          <div>
            <label className={labelClasses}>Skill Name</label>
            <input
              {...register("name")}
              placeholder="e.g. React, Next.js, Docker"
              className={inputClasses}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className={labelClasses}>Category</label>
            <input
              {...register("category")}
              placeholder="e.g. Frontend, Backend, Tools"
              list="categories"
              className={inputClasses}
            />
            <datalist id="categories">
              <option value="Frontend" />
              <option value="Backend" />
              <option value="DevOps" />
              <option value="Tools" />
              <option value="Languages" />
            </datalist>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Icon URL */}
          <div>
            <label className={labelClasses}>Icon URL (Optional)</label>
            <input
              {...register("iconUrl")}
              placeholder="https://cdn.jsdelivr.net/.../react-original.svg"
              className={inputClasses}
            />
            {errors.iconUrl && <p className="text-red-500 text-sm mt-1">{errors.iconUrl.message}</p>}
          </div>

          {/* Proficiency */}
          <div>
            <label className={labelClasses}>Proficiency % (1-100) (Optional)</label>
            <input
              type="number"
              {...register("proficiency")}
              placeholder="e.g. 90"
              className={inputClasses}
            />
            {errors.proficiency && <p className="text-red-500 text-sm mt-1">{errors.proficiency.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-opacity cursor-pointer"
        >
          {isPending ? "Saving..." : initialData ? "Update Skill" : "Add Skill"}
        </button>
      </form>
    </>
  );
}
