import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "@/components/admin/ProfileForm";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // Import prisma

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch fresh user data from the database
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!dbUser) {
    redirect("/login"); // Should not happen if session exists
  }

  // Ensure user ID is present
  const user = {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    image: dbUser.image,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information and credentials.</p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}
