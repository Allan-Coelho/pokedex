/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `PokeTeam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PokeTeam_title_key" ON "PokeTeam"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
