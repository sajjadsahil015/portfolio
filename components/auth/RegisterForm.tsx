"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { createUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type RegisterPayload = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    startTransition(async () => {
      const result = await createUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        // Optionally redirect to login page after successful registration
        router.push("/login");
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 bg-card border border-border rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                sign in to your existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Name */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    {...register("name")}
                    className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email")}
                    className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>
              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...register("password")}
                    className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
              </div>
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...register("confirmPassword")}
                    className="appearance-none rounded-none relative block w-full pl-10 pr-3 py-2 border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
