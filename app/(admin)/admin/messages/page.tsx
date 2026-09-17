import MessageActions from "@/components/admin/MessageActions";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fresh for admin inbox

export default async function AdminMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await prisma.message.findMany({
      orderBy: [
        { isRead: "asc" }, // Unread first
        { createdAt: "desc" }, // Newest first
      ],
    });
  } catch (err) {
    console.error("Failed to load messages:", err);
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inbox</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">View inquiries received through the contact form.</p>
        </div>
        <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full">
          {unreadCount} Unread
        </span>
      </div>

      <div className="bg-white dark:bg-[#171726] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden rounded-xl">
        <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-800">
          {messages.length === 0 ? (
            <li className="p-8 text-center text-slate-500 dark:text-slate-400">No messages found.</li>
          ) : (
            messages.map((msg) => (
              <li 
                key={msg.id} 
                className={`px-6 py-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${
                  !msg.isRead ? "bg-primary/5 dark:bg-primary/10" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`text-base font-semibold ${!msg.isRead ? "text-primary dark:text-purple-300" : "text-slate-900 dark:text-slate-100"}`}>
                      {msg.subject || "No Subject"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      From: <span className="font-medium text-slate-700 dark:text-slate-300">{msg.name}</span> &lt;{msg.email}&gt;
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap ml-4">
                    {msg.createdAt ? format(new Date(msg.createdAt), "MMM d, yyyy h:mm a") : ""}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>

                <div className="flex justify-end">
                  <MessageActions id={msg.id} isRead={msg.isRead} />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}