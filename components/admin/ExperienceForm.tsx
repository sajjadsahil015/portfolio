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

  const inputClasses = "mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0e0e1b] text-slate-900 dark:text-white p-2.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-slate-400";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm max-w-2xl">
        <div className="grid gap-5">
          {/* Type */}
          <div>
            <label className={labelClasses}>Type</label>
            <select
              {...register("type")}
              className={inputClasses}
            >
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          {/* Position/Role */}
          <div>
            <label className={labelClasses}>Position / Degree</label>
            <input
              {...register("position")}
              placeholder="e.g. Senior Full Stack Engineer or BS Computer Science"
              className={inputClasses}
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
          </div>

          {/* Company/University */}
          <div>
            <label className={labelClasses}>Company / University</label>
            <input
              {...register("company")}
              placeholder="e.g. Tech Corp or University of Engineering"
              className={inputClasses}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className={labelClasses}>Location (Optional)</label>
            <input
              {...register("location")}
              placeholder="e.g. Remote, or New York, NY"
              className={inputClasses}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className={labelClasses}>Start Date</label>
              <input
                type="date"
                {...register("startDate")}
                className={inputClasses}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className={labelClasses}>End Date (Leave blank if currently working)</label>
              <input
                type="date"
                {...register("endDate")}
                className={inputClasses}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Highlight your key achievements, skills used, responsibilities..."
              className={inputClasses}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-opacity cursor-pointer"
        >
          {isPending ? "Saving..." : initialData ? "Update Experience" : "Add Experience"}
        </button>
      </form>
    </>
  );
}
