import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { compare } from "bcryptjs";
import { buildDatabaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({
  adapter: new PrismaPg(buildDatabaseUrl())
});

async function main() {
  const user = await prisma.user.findUnique({ where: { login: "admin" } });
  const passwordMatches = user ? await compare("admin123", user.passwordHash) : false;

  console.log(
    JSON.stringify({
      exists: Boolean(user),
      login: user?.login,
      status: user?.status,
      deletedAt: user?.deletedAt,
      passwordMatches
    })
  );
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
