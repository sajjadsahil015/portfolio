import ProjectForm from "@/components/admin/ProjectForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    notFound();
  }

  // Adapt Prisma data to Form data (handle nulls)
  const initialData = {
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    techStack: project.techStack,
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    featured: project.featured,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <ProjectForm initialData={initialData} />
    </div>
  );
}
