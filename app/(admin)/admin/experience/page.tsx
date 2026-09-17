import Link from "next/link";
import prisma from "@/lib/prisma";
import ExperienceListActions from "@/components/admin/ExperienceListActions";
import { format } from "date-fns";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  let experiences: any[] = [];
  try {
    experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Experience</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your employment and education background.</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 shadow-sm transition-opacity"
        >
          <Plus size={18} />
          Add New Experience
        </Link>
      </div>

      <div className="bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden rounded-xl">
        <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-800">
          {experiences.length === 0 ? (
            <li className="p-8 text-center text-slate-500 dark:text-slate-400">No experience entries found.</li>
          ) : (
            experiences.map((exp) => (
              <li key={exp.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{exp.position}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      exp.type === 'work' 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : ""} — {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
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