import SkillForm from "@/components/admin/SkillForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditSkillPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const skillId = parseInt(id);

  if (isNaN(skillId)) {
    notFound();
  }

  const skill = await prisma.skill.findUnique({
    where: { id: skillId },
  });

  if (!skill) {
    notFound();
  }

  const initialData = {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    iconUrl: skill.iconUrl ?? "",
    proficiency: skill.proficiency ?? undefined,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Skill</h1>
      <SkillForm initialData={initialData} />
    </div>
  );
}
