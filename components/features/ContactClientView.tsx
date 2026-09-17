"use client";

import ContactForm from "@/components/features/ContactForm";
import { motion, Variants, Transition } from "framer-motion";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import EmailCopyButton from "@/components/ui/EmailCopyButton"; // Import the new component

export default function ContactClientView() {
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
    show: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 };

  return (
    <motion.div 
      className="container mx-auto py-20 px-4 min-h-[90vh] flex flex-col lg:flex-row gap-12 items-start justify-center"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Left Side: Contact Info */}
      <motion.div variants={itemVariants} transition={transitionProps} className="lg:w-1/3 space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Me</p>
              <EmailCopyButton 
                email="sajjadsahil015@gmail.com" 
                subject="Portfolio Inquiry" 
                body="Hi Sajjad, I saw your portfolio and would like to discuss..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
              <MessageCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <a href="https://wa.me/923472846364" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[#25D366] transition-colors">
                +92 347 2846364
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm font-medium mb-4">Follow Me</p>
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
              <Github size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Contact Form */}
      <motion.div variants={itemVariants} transition={transitionProps} className="lg:w-2/3 w-full bg-card p-8 rounded-3xl border border-border/50 shadow-xl shadow-black/5">
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}

