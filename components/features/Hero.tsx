"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition
import { ArrowRight, Mail } from "lucide-react";

interface HeroProps {
  user: {
    name?: string | null;
    image?: string | null;
  } | null;
}

export default function Hero({ user }: HeroProps) {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = { delay: 0.2, duration: 0.8, type: "spring", stiffness: 100, damping: 10 };

  const profileImage = user?.image || "/Profile.png";

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center space-y-10 px-4 overflow-hidden pt-16">
      {/* Subtle Background Gradients - Optimized for both modes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
            <Image 
            src={profileImage} 
            alt={user?.name || "Profile Picture"} 
            fill
            className="object-cover"
            priority
            />
        </div>
      </motion.div>

      <div className="max-w-4xl space-y-6">
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="show"
          transition={transitionProps}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          {user?.name ? (
            <>Hi, I'm <span className="text-gradient">{user.name}</span></>
          ) : (
            <>Building <span className="text-gradient">Digital Experiences</span></>
          )}
        </motion.h1>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          animate="show"
          transition={{ ...transitionProps, delay: 0.4 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Agentic AI Developer & FullStack Developer - building intelligent, autonomous AI agents and modern web applications.
        </motion.p>
      </div>

      <motion.div 
        variants={buttonVariants}
        initial="hidden"
        animate="show"
        transition={{ ...transitionProps, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
      >
        <Link 
          href="/projects" 
          className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
        >
          View Projects <ArrowRight size={18} />
        </Link>
        <Link 
          href="/contact" 
          className="px-8 py-3.5 rounded-full bg-card border border-border hover:bg-secondary transition-all hover:scale-105 shadow-sm flex items-center justify-center gap-2 font-medium"
        >
          Contact Me <Mail size={18} />
        </Link>
      </motion.div>
    </section>
  );
}
