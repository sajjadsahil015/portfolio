import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const isUrlPresent = !!dbUrl;
  const maskedUrl = dbUrl
    ? dbUrl.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@")
    : "NOT_SET";

  try {
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    const skillCount = await prisma.skill.count();
    const experienceCount = await prisma.experience.count();

    return NextResponse.json({
      status: "CONNECTED_SUCCESSFULLY",
      databaseUrlStatus: isUrlPresent ? "PRESENT" : "MISSING",
      databaseUrlMasked: maskedUrl,
      counts: {
        users: userCount,
        projects: projectCount,
        skills: skillCount,
        experiences: experienceCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "CONNECTION_FAILED",
      databaseUrlStatus: isUrlPresent ? "PRESENT" : "MISSING",
      databaseUrlMasked: maskedUrl,
      errorName: error?.name,
      errorMessage: error?.message,
      errorCode: error?.code,
    }, { status: 500 });
  }
}
