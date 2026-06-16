import "dotenv/config";
import { Client } from "pg";

function requiredEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function quoteIdentifier(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

async function main() {
  const databaseName = requiredEnv("DB_NAME", "financeiro");
  const client = new Client({
    host: requiredEnv("DB_HOST", "localhost"),
    port: Number(requiredEnv("DB_PORT", "5432")),
    user: requiredEnv("DB_USER", "postgres"),
    password: requiredEnv("DB_PASSWORD", "postgres"),
    database: process.env.DB_ADMIN_DATABASE ?? "postgres"
  });

  await client.connect();

  const existing = await client.query("select 1 from pg_database where datname = $1", [databaseName]);
  if (existing.rowCount === 0) {
    await client.query(`create database ${quoteIdentifier(databaseName)}`);
    console.log("Database created.");
  } else {
    console.log("Database already exists.");
  }

  await client.end();
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
