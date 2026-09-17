import AboutClientView from "@/components/features/AboutClientView";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function AboutPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <AboutClientView experiences={experiences} />
  );
}
