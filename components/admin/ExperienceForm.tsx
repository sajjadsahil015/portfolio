"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, ExperienceFormValues } from "@/lib/validations/experience";
import { createExperience, updateExperience } from "@/app/actions/experienceActions";
import { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ExperienceFormProps {
  initialData?: ExperienceFormValues & { id: number };
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData || {
      type: "work",
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    startTransition(async () => {
      if (initialData) {
        const res = await updateExperience(initialData.id, data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Experience updated successfully!");
        }
      } else {
        const res = await createExperience(data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Experience added successfully!");
        }
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-md max-w-2xl">
      <div className="grid gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register("type")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="work">Work</option>
            <option value="education">Education</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Position/Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Position / Role</label>
          <input
            {...register("position")}
            placeholder="e.g. Senior Developer or BS Computer Science"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>

        {/* Company/University */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company / University</label>
          <input
            {...register("company")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location (Optional)</label>
          <input
            {...register("location")}
            placeholder="e.g. New York, NY"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date (Leave blank if current)</label>
            <input
              type="date"
              {...register("endDate")}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe your responsibilities or achievements..."
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isPending ? "Saving..." : initialData ? "Update Experience" : "Add Experience"}
      </button>
    </form>
    </>
  );
}
