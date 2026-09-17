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

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-md max-w-lg">
      <div className="grid gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skill Name</label>
          <input
            {...register("name")}
            placeholder="e.g. React"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            {...register("category")}
            placeholder="e.g. Frontend, Backend, Tools"
            list="categories"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <datalist id="categories">
            <option value="Frontend" />
            <option value="Backend" />
            <option value="DevOps" />
            <option value="Tools" />
            <option value="Languages" />
          </datalist>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Icon URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon URL (Optional)</label>
          <input
            {...register("iconUrl")}
            placeholder="https://example.com/icon.png"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.iconUrl && <p className="text-red-500 text-sm">{errors.iconUrl.message}</p>}
        </div>

        {/* Proficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Proficiency (1-100) (Optional)</label>
          <input
            type="number"
            {...register("proficiency")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.proficiency && <p className="text-red-500 text-sm">{errors.proficiency.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? "Saving..." : initialData ? "Update Skill" : "Add Skill"}
      </button>
    </form>
    </>
  );
}
