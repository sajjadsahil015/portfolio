"use client";

import SkillsList from "@/components/features/SkillsList";
import { Skill } from "@/lib/generated/client/client";
import { motion, Variants, Transition } from "framer-motion";

interface SkillsSectionClientProps {
  skills: Skill[];
}

export default function SkillsSectionClient({ skills }: SkillsSectionClientProps) {
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
      <motion.div variants={itemVariants} transition={transitionProps}>
        <SkillsList skills={skills} />
      </motion.div>
    </motion.section>
  );
}