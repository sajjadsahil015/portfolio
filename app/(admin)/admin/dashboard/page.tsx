import prisma from "@/lib/prisma";
import Link from "next/link";
import { FolderOpen, Wrench, Briefcase, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let projectCount = 0;
  let skillCount = 0;
  let experienceCount = 0;
  let unreadMessages = 0;

  try {
    projectCount = await prisma.project.count();
    skillCount = await prisma.skill.count();
    experienceCount = await prisma.experience.count();
    unreadMessages = await prisma.message.count({ where: { isRead: false } });
  } catch (e) {
    console.error("Failed to load dashboard counts:", e);
  }

  const cards = [
    { label: "Projects", count: projectCount, href: "/admin/projects", icon: FolderOpen, color: "text-blue-500 bg-blue-500/10" },
    { label: "Skills", count: skillCount, href: "/admin/skills", icon: Wrench, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Experience", count: experienceCount, href: "/admin/experience", icon: Briefcase, color: "text-purple-500 bg-purple-500/10" },
    { label: "Unread Messages", count: unreadMessages, href: "/admin/messages", icon: Mail, color: "text-amber-500 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back! Manage your portfolio content and inquiries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="p-6 rounded-2xl bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{c.label}</span>
                <div className={`p-2.5 rounded-xl ${c.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{c.count}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-2 group-hover:text-primary transition-colors">
                Manage &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
