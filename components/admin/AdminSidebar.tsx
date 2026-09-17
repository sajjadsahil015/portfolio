"use client";

import Link from 'next/link';
import { LayoutDashboard, FolderOpen, Briefcase, Wrench, Mail, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AdminSidebar() {
  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    { href: "/admin/experience", label: "Experience", icon: Briefcase },
    { href: "/admin/skills", label: "Skills", icon: Wrench },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-white min-h-screen p-4 flex flex-col border-r border-slate-800">
      <div className="mb-8 px-2 py-2 text-xl font-bold tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-lg">A</div>
        Admin Panel
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-slate-300 hover:text-white"
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800 mt-auto space-y-2">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs text-slate-400 font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium text-slate-400 hover:text-white"
        >
          View Live Site ↗
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm font-medium w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
