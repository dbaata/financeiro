import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildDatabaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({
  adapter: new PrismaPg(buildDatabaseUrl())
});

async function main() {
  const login = "admin";
  const email = "admin@example.com";
  const passwordHash = await hash("admin123", 12);

  await prisma.user.upsert({
    where: { login },
    update: {
      email,
      name: "Administrador",
      status: "ACTIVE",
      deletedAt: null,
      passwordHash
    },
    create: {
      login,
      email,
      name: "Administrador",
      passwordHash
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
