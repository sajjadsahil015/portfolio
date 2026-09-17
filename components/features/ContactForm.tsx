"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations/contact";
import { createMessage } from "@/app/actions/contactActions";
import { useState, useTransition } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { motion, Variants, Transition } from "framer-motion"; // Import Variants and Transition

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      content: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    startTransition(async () => {
      const result = await createMessage(data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Message sent successfully!");
        reset();
      }
    });
  };

  const inputClasses = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all";
  const labelClasses = "block text-sm font-medium text-foreground mb-1";

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const transitionProps: Transition = { type: "spring", stiffness: 100, damping: 10 };

  return (
    <>
      <Toaster position="top-right" />
      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border"
        variants={formVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        transition={transitionProps}
      >
        <div className="grid gap-4">
          {/* Name */}
          <div>
            <label className={labelClasses}>Name</label>
            <input
              {...register("name")}
              placeholder="Your Name"
              className={inputClasses}
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelClasses}>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={inputClasses}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className={labelClasses}>Subject (Optional)</label>
            <input
              {...register("subject")}
              placeholder="Project Inquiry"
              className={inputClasses}
            />
          </div>

          {/* Message */}
          <div>
            <label className={labelClasses}>Message</label>
            <textarea
              {...register("content")}
              rows={5}
              placeholder="How can I help you?"
              className={inputClasses}
            />
            {errors.content && <p className="text-destructive text-xs mt-1">{errors.content.message}</p>}
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-200 hover:scale-[1.01]"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ ...transitionProps, duration: 0.1 }} // Shorter transition for button press
        >
          {isPending ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </>
  );
}
