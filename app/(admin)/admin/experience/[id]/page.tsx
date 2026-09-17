import ExperienceForm from "@/components/admin/ExperienceForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  const expId = parseInt(id);

  if (isNaN(expId)) {
    notFound();
  }

  const experience = await prisma.experience.findUnique({
    where: { id: expId },
  });

  if (!experience) {
    notFound();
  }

  // Adapt Prisma data to Form data (handle dates)
  const initialData = {
    id: experience.id,
    type: experience.type as "work" | "education",
    position: experience.position,
    company: experience.company,
    location: experience.location ?? "",
    startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : "",
    endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : "",
    description: experience.description,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Experience</h1>
      <ExperienceForm initialData={initialData} />
    </div>
  );
}
