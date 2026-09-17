import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectListActions from "@/components/admin/ProjectListActions";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add, edit, or delete portfolio projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 shadow-sm transition-opacity"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden rounded-xl">
        <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-800">
          {projects.length === 0 ? (
            <li className="p-8 text-center text-slate-500 dark:text-slate-400">No projects found.</li>
          ) : (
            projects.map((project) => (
              <li key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{project.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-md mt-0.5">
                    {project.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium border border-amber-500/20">
                        Featured
                      </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-500">{project.techStack}</span>
                  </div>
                </div>
                <ProjectListActions id={project.id} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}