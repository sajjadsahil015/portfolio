"use client";

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { motion, Variants, Transition } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

export default function ProjectCard({ title, description, imageUrl, techStack, liveUrl, githubUrl }: ProjectCardProps) {
  const techs = techStack.split(',').map(t => t.trim());

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 };

  return (
    <motion.div
      variants={cardVariants}
      transition={transitionProps}
      className="group flex flex-col border border-border/70 rounded-xl overflow-hidden bg-card text-card-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techs.map((tech, index) => (
            <span key={index} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto pt-4 border-t border-border">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
