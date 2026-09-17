"use client";

import { deleteMessage, markMessageAsRead } from "@/app/actions/contactActions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface MessageActionsProps {
  id: number;
  isRead: boolean;
}

export default function MessageActions({ id, isRead }: MessageActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMarkAsRead = () => {
    startTransition(async () => {
      const result = await markMessageAsRead(id);
      if (result?.error) toast.error(result.error);
      else toast.success("Marked as read");
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this message?")) {
      startTransition(async () => {
        const result = await deleteMessage(id);
        if (result?.error) toast.error(result.error);
        else toast.success("Message deleted");
      });
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {!isRead && (
        <button
          onClick={handleMarkAsRead}
          disabled={isPending}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Mark Read
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
