import Link from "next/link";
import prisma from "@/lib/prisma";
import SkillListActions from "@/components/admin/SkillListActions";
import { Plus } from "lucide-react";

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
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Skills</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add or manage your technical proficiencies.</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 shadow-sm transition-opacity"
        >
          <Plus size={18} />
          Add New Skill
        </Link>
      </div>

      <div className="bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden rounded-xl">
        <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-800">
          {skills.length === 0 ? (
            <li className="p-8 text-center text-slate-500 dark:text-slate-400">No skills found.</li>
          ) : (
            skills.map((skill) => (
              <li key={skill.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  {skill.iconUrl ? (
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
                      {skill.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{skill.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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