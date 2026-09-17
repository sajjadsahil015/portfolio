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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}
