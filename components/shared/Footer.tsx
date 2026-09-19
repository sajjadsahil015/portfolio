"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Facebook, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "sajjadsahil015@gmail.com";
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Portfolio%20Inquiry&body=Hi%20Sajjad%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss...`;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-slate-50 dark:bg-background border-t border-border text-foreground dark:text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="text-center md:text-left">
            <Link href="/" className="font-bold text-xl tracking-tighter mb-2 block text-foreground dark:text-white">
              Sajjad<span className="text-primary">Hassan</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
              Building high-quality digital experiences with a focus on performance and user experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Let's Connect</p>
            <div className="flex flex-col items-center md:items-end gap-2">
              <button 
                onClick={handleCopy}
                className="text-lg font-medium hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group text-foreground dark:text-white"
              >
                <Mail size={18} />
                {email}
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />}
              </button>
              <a 
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded border border-border/50 transition-colors"
              >
                <ExternalLink size={12} />
                Open in Gmail
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-8 border-t border-border/50 gap-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Sajjad Hassan. All rights reserved.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-secondary/50 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-primary/10 transition-all border border-border"
            >
              <Github size={20} />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-secondary/50 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-primary/10 transition-all border border-border"
            >
              <Linkedin size={20} />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-secondary/50 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-primary/10 transition-all border border-border"
            >
              <Twitter size={20} />
            </Link>
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-secondary/50 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-white hover:bg-primary/10 transition-all border border-border"
            >
              <Facebook size={20} />
            </Link>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>
    </footer>
  );
}

