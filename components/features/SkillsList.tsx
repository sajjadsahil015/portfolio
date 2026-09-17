"use client";

import { Skill } from "@/lib/generated/client/client";
import { Code2, Database, Wrench, Cpu, Layers } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition
import Image from "next/image";

interface SkillsListProps {
  skills: Skill[];
}

const categoryIcons: Record<string, any> = {
  Frontend: Code2,
  Backend: Database,
  Tools: Wrench,
  DevOps: Layers,
  Languages: Code2, // Added for potential language skills
  default: Cpu,
};

export default function SkillsList({ skills = [] }: SkillsListProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }, // Removed transition from here
  };
  
  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 }; // Explicitly typed as Transition

  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Skills & Technologies</h2>
        <p className="text-muted-foreground max-w-2xl">
          My technical toolkit and proficiency levels.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || categoryIcons.default;
          return (
            <div key={category} className="space-y-4">
              <motion.div 
                className="flex items-center gap-3 pb-2 border-b border-border/50 mb-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={itemVariants}
                transition={transitionProps}
              >
                <div className="p-2 bg-secondary rounded-lg text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groupedSkills[category].map((skill) => (
                  <motion.div
                    key={skill.id}
                    className="flex items-center gap-3 bg-card border border-border/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:shadow-primary/5 group"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={itemVariants}
                    transition={transitionProps}
                  >
                    {skill.iconUrl ? (
                      <Image width={24} height={24} src={skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                         <span className="text-[10px] font-bold text-primary">{skill.name[0]}</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{skill.name}</span>
                        {skill.proficiency && (
                           <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        )}
                      </div>
                      {skill.proficiency && (
                        <div className="h-1 w-full bg-secondary rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.proficiency}%` }} 
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
