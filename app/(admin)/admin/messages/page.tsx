import MessageActions from "@/components/admin/MessageActions";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

export const revalidate = 0; // Always fresh for admin inbox

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: [
      { isRead: "asc" }, // Unread first
      { createdAt: "desc" }, // Newest first
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {messages.filter((m) => !m.isRead).length} Unread
        </span>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {messages.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No messages found.</li>
          ) : (
            messages.map((msg) => (
              <li 
                key={msg.id} 
                className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!msg.isRead ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`text-sm font-medium ${!msg.isRead ? "text-blue-900 font-bold" : "text-gray-900"}`}>
                      {msg.subject || "No Subject"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      From: <span className="font-medium text-gray-700">{msg.name}</span> &lt;{msg.email}&gt;
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {format(msg.createdAt, "MMM d, yyyy h:mm a")}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">
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