/*
  Warnings:

  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - Added the required column `techStack` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "imageUrl", "title", "updatedAt") SELECT "createdAt", "description", "id", "imageUrl", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
