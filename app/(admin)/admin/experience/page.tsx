import Link from "next/link";
import prisma from "@/lib/prisma";
import ExperienceListActions from "@/components/admin/ExperienceListActions";
import { format } from "date-fns";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Experience</h1>
        <Link
          href="/admin/experience/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Experience
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {experiences.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No experience entries found.</li>
          ) : (
            experiences.map((exp) => (
              <li key={exp.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{exp.position}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${exp.type === 'work' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{exp.company} {exp.location && `- ${exp.location}`}</p>
                  <p className="text-xs text-gray-400">
                    {format(exp.startDate, "MMM yyyy")} - {exp.endDate ? format(exp.endDate, "MMM yyyy") : "Present"}
                  </p>
                </div>
                <ExperienceListActions id={exp.id} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}