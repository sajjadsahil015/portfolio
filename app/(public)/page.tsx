import Hero from "@/components/features/Hero";
import ProjectsPreviewClient from "@/components/features/ProjectsPreviewClient";
import SkillsSectionClient from "@/components/features/SkillsSectionClient";
import { getProjects } from "@/app/actions/projectActions";
import { getSkills } from "@/app/actions/skillActions";
import { getAdminUser } from "@/app/actions/userActions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const skills = await getSkills();
  const adminUser = await getAdminUser();

  return (
    <div className="space-y-24 pb-24">
      <Hero user={adminUser} />
      <SkillsSectionClient skills={skills} />
      <ProjectsPreviewClient projects={featuredProjects} />
    </div>
  );
}
