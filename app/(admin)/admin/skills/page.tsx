import Link from "next/link";
import prisma from "@/lib/prisma";
import SkillListActions from "@/components/admin/SkillListActions";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  let skills: any[] = [];
  try {
    skills = await prisma.skill.findMany({
      orderBy: { category: "asc" },
    });
  } catch (err) {
    console.error("Failed to load skills:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <Link
          href="/admin/skills/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Skill
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {skills.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No skills found.</li>
          ) : (
            skills.map((skill) => (
              <li key={skill.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {skill.iconUrl && (
                    <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 rounded object-contain" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                    <p className="text-xs text-gray-500">
                      {skill.category} {skill.proficiency && `• ${skill.proficiency}%`}
                    </p>
                  </div>
                </div>
                <SkillListActions id={skill.id} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}