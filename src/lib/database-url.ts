type DatabaseEnv = {
  [key: string]: string | undefined;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_SCHEMA?: string;
};

export function buildDatabaseUrl(env: DatabaseEnv = process.env) {
  const host = env.DB_HOST ?? "localhost";
  const port = env.DB_PORT ?? "5432";
  const name = env.DB_NAME ?? "financeiro";
  const user = env.DB_USER ?? "postgres";
  const password = env.DB_PASSWORD ?? "postgres";
  const schema = env.DB_SCHEMA ?? "public";

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${name}?schema=${schema}`;
}
