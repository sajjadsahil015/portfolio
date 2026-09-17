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
    <div className="flex gap-2">
      {!isRead && (
        <button
          onClick={handleMarkAsRead}
          disabled={isPending}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
        >
          Mark Read
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
