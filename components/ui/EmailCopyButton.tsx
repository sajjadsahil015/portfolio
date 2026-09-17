"use client";

import { useState } from "react";
import { Copy, Check, Mail, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

interface EmailCopyButtonProps {
  email: string;
  subject?: string;
  body?: string;
}

export default function EmailCopyButton({ email, subject, body }: EmailCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject || "")}&body=${encodeURIComponent(body || "")}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="group flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors text-left"
          title="Click to copy email"
        >
          {email}
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />}
        </button>
      </div>
      
      <div className="flex gap-3 text-xs">
        <a 
          href={gmailLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary flex items-center gap-1 border border-border px-2 py-1 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
        >
          <Mail size={12} />
          Open in Gmail
        </a>
        <a 
          href={mailtoLink}
          className="text-muted-foreground hover:text-primary flex items-center gap-1 border border-border px-2 py-1 rounded bg-secondary/20 hover:bg-secondary/40 transition-colors"
        >
          <ExternalLink size={12} />
          Default Mail App
        </a>
      </div>
    </div>
  );
}
