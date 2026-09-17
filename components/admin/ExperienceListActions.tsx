"use client";

import { deleteExperience } from "@/app/actions/experienceActions";
import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function ExperienceListActions({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      startTransition(async () => {
        const res = await deleteExperience(id);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Experience entry deleted successfully!");
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/admin/experience/${id}`}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
