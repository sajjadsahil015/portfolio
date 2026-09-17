import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Experience</h1>
      <ExperienceForm />
    </div>
  );
}
