import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { buildDatabaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({
  adapter: new PrismaPg(buildDatabaseUrl())
});

async function main() {
  const counts = {
    users: await prisma.user.count(),
    expenses: await prisma.expense.count(),
    payableAccounts: await prisma.payableAccount.count(),
    investments: await prisma.investment.count()
  };

  console.log(JSON.stringify(counts));
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    await prisma.$disconnect();
    process.exit(1);
  });
