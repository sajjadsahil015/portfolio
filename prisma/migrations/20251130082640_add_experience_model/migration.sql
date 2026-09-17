-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
