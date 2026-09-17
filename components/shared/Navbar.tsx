"use client";

import Link from 'next/link';
import { Home, FolderKanban, User, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0e0e1b] transition-all duration-300 border-b border-zinc-200 dark:border-white/10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="font-bold text-2xl tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            S
          </div>
          <span className="hidden sm:inline-block group-hover:text-primary transition-colors">Portfolio</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary dark:text-white" 
                      : "text-zinc-600 dark:text-slate-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary/20 dark:bg-primary/45 border border-primary/40 dark:border-primary/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-lg -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <Icon size={18} />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="h-6 w-px bg-zinc-200 dark:bg-white/10 mx-1 hidden sm:block" />
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
