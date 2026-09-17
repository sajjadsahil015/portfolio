import ProjectsClientView from "@/components/features/ProjectsClientView";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <ProjectsClientView projects={projects} />
  );
}
