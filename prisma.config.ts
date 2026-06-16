import "dotenv/config";
import { defineConfig } from "prisma/config";
import { buildDatabaseUrl } from "./src/lib/database-url";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: buildDatabaseUrl()
  },
  migrations: {
    seed: "tsx prisma/seed.ts"
  }
});
