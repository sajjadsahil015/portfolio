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
    <div className="flex gap-2">
      <Link
        href={`/admin/experience/${id}`}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
