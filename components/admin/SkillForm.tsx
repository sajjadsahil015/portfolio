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
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || {
      name: "",
      category: "Agentic AI",
      iconUrl: "",
      proficiency: undefined,
    },
  });

  const currentIconUrl = watch("iconUrl");

  const onSubmit = async (data: SkillFormValues) => {
    let formattedIconUrl = data.iconUrl?.trim() || "";
    if (
      formattedIconUrl &&
      !formattedIconUrl.startsWith("http://") &&
      !formattedIconUrl.startsWith("https://") &&
      !formattedIconUrl.startsWith("/")
    ) {
      formattedIconUrl = "/" + formattedIconUrl;
    }

    const payload = { ...data, iconUrl: formattedIconUrl };

    startTransition(async () => {
      if (initialData) {
        const res = await updateSkill(initialData.id, payload);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Skill updated successfully!");
        }
      } else {
        const res = await createSkill(payload);
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

  const aiPresets = [
    { label: "OpenAI", url: "/icons/openai.svg" },
    { label: "LangChain", url: "/icons/langchain.svg" },
    { label: "CrewAI", url: "/icons/crewai.svg" },
    { label: "Claude", url: "/icons/anthropic.svg" },
    { label: "Python", url: "/icons/python.svg" },
    { label: "openai_dark", url: "/openai_dark.svg" },
  ];

  const previewSrc = currentIconUrl
    ? currentIconUrl.startsWith("http") || currentIconUrl.startsWith("/")
      ? currentIconUrl
      : `/${currentIconUrl}`
    : null;

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
              placeholder="e.g. Agentic AI, Frontend, Backend, Tools"
              list="categories"
              className={inputClasses}
            />
            <datalist id="categories">
              <option value="Agentic AI & LLMs" />
              <option value="Vector & Data" />
              <option value="Backend Development" />
              <option value="Frontend Development" />
              <option value="Tools & Practices" />
            </datalist>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Icon URL */}
          <div>
            <label className={labelClasses}>Icon URL or Local Path (Optional)</label>
            <div className="flex gap-2 items-center mt-1.5">
              <input
                {...register("iconUrl")}
                placeholder="e.g. /icons/openai.svg or https://..."
                className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0e0e1b] text-slate-900 dark:text-white p-2.5 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-slate-400"
              />
              {previewSrc && (
                <div className="w-11 h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 shrink-0">
                  <img
                    src={previewSrc}
                    alt="Icon Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            {errors.iconUrl && <p className="text-red-500 text-sm mt-1">{errors.iconUrl.message}</p>}

            {/* Quick AI Presets */}
            <div className="mt-2.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                Quick Select Icon (1-Click):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setValue("iconUrl", preset.url, { shouldValidate: true })}
                    className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
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
