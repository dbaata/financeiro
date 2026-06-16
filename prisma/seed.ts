import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildDatabaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({
  adapter: new PrismaPg(buildDatabaseUrl())
});

async function main() {
  const login = process.env.ADMIN_LOGIN ?? "admin";
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  await prisma.user.upsert({
    where: { login },
    update: {},
    create: {
      login,
      email,
      name: process.env.ADMIN_NAME ?? "Administrador",
      passwordHash: await hash(password, 12)
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
