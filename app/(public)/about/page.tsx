import AboutClientView from "@/components/features/AboutClientView";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let experiences: any[] = [];
  try {
    experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (err) {
    console.error("Failed to fetch experiences:", err);
  }

  return (
    <AboutClientView experiences={experiences} />
  );
}
