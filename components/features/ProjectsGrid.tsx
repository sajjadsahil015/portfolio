import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/generated/client/client";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
          techStack={project.techStack}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
        />
      ))}
    </div>
  );
}
