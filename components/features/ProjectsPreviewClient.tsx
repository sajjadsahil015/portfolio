"use client";

import ProjectsGrid from "@/components/features/ProjectsGrid";
import { Project } from "@/lib/generated/client/client";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectsPreviewClientProps {
  projects: Project[];
}

export default function ProjectsPreviewClient({ projects = [] }: ProjectsPreviewClientProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 };

  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div 
        className="flex justify-between items-end mb-12"
        variants={itemVariants}
        transition={transitionProps}
      >
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <Link href="/projects" className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
      </motion.div>
      <motion.div variants={itemVariants} transition={transitionProps}>
        <ProjectsGrid projects={projects} />
      </motion.div>
    </motion.section>
  );
}
