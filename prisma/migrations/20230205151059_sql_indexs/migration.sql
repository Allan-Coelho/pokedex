-- CreateIndex
CREATE INDEX "PokeTeam_userId_idx" ON "PokeTeam"("userId");

-- CreateIndex
CREATE INDEX "Pokemon_pokeTeamId_idx" ON "Pokemon"("pokeTeamId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "User_nickname_idx" ON "User"("nickname");
