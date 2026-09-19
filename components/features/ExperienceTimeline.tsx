"use client";

import { Experience } from "@/lib/generated/client/client";
import { format } from "date-fns";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const work = experiences.filter(e => e.type === 'work');
  const education = experiences.filter(e => e.type === 'education');
  const hasWork = work.length > 0;
  const hasEducation = education.length > 0;

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 };

  if (!hasWork && !hasEducation) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Experience details coming soon.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${hasWork && hasEducation ? "md:grid-cols-2 gap-12 md:gap-20" : "max-w-2xl mx-auto"}`}>
      {/* Work Experience */}
      {hasWork && (
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Briefcase size={24} />
            </div>
            Work Experience
          </h2>
          <motion.div 
            className="space-y-12 border-l-2 border-border ml-3 pl-8 sm:ml-4 sm:pl-10 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
          {work.map((exp) => (
            <motion.div key={exp.id} className="relative group" variants={itemVariants} transition={transitionProps}>
              <span className="absolute -left-[41px] sm:-left-[49px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary group-hover:scale-125 transition-transform duration-300" />
              
              <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <p className="text-lg font-medium text-muted-foreground">{exp.company}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {format(exp.startDate, "MMM yyyy")} - {exp.endDate ? format(exp.endDate, "MMM yyyy") : "Present"}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      )}

      {/* Education */}
      {hasEducation && (
      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <GraduationCap size={24} />
          </div>
          Education
        </h2>
        <motion.div 
          className="space-y-12 border-l-2 border-border ml-3 pl-8 sm:ml-4 sm:pl-10 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {education.map((edu) => (
            <motion.div key={edu.id} className="relative group" variants={itemVariants} transition={transitionProps}>
              <span className="absolute -left-[41px] sm:-left-[49px] top-1 h-5 w-5 rounded-full border-4 border-background bg-emerald-500 group-hover:scale-125 transition-transform duration-300" />
              
              <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-xl font-bold">{edu.position}</h3>
                <p className="text-lg font-medium text-muted-foreground">{edu.company}</p>
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {format(edu.startDate, "MMM yyyy")} - {edu.endDate ? format(edu.endDate, "MMM yyyy") : "Present"}
                </span>
                {edu.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      )}
    </div>
  );
}
