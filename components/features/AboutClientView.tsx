"use client";

import ExperienceTimeline from "@/components/features/ExperienceTimeline";
import { Experience } from "@/lib/generated/client/client";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition

interface AboutClientViewProps {
  experiences: Experience[];
}

export default function AboutClientView({ experiences }: AboutClientViewProps) {
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
      <motion.div variants={itemVariants} transition={transitionProps} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
        
        <motion.p 
          variants={itemVariants} 
          transition={transitionProps}
          className="text-lg text-muted-foreground text-center mb-12"
        >
          Passionate developer with a track record of building scalable applications.
        </motion.p>

        <ExperienceTimeline experiences={experiences} />
      </motion.div>
    </motion.div>
  );
}


