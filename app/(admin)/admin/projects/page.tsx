import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectListActions from "@/components/admin/ProjectListActions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Project
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {projects.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No projects found.</li>
          ) : (
            projects.map((project) => (
              <li key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {project.description}
                  </p>
                  <div className="mt-1 flex gap-2 text-xs text-gray-400">
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                    <span>{project.techStack}</span>
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