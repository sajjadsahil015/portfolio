"use client";

import ProjectsGrid from "@/components/features/ProjectsGrid";
import { Project } from "@/lib/generated/client/client";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition

interface ProjectsClientViewProps {
  projects: Project[];
}

export default function ProjectsClientView({ projects }: ProjectsClientViewProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }, // Removed transition from here
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 }; // Explicitly typed as Transition


  return (
    <motion.div 
      className="container mx-auto py-12 px-4"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center"
        variants={itemVariants}
        transition={transitionProps}
      >
        My Work
      </motion.h1>
      <ProjectsGrid projects={projects} />
    </motion.div>
  );
}
