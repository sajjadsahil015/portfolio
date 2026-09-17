import ProjectsClientView from "@/components/features/ProjectsClientView";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to fetch projects:", err);
  }

  return (
    <ProjectsClientView projects={projects} />
  );
}
