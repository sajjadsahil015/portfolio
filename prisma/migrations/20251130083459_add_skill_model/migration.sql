-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "iconUrl" TEXT,
    "proficiency" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
