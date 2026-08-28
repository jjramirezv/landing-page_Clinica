import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type SqlFn = NeonQueryFunction<false, false>;

let client: SqlFn | null = null;

function getClient(): SqlFn {
  if (!client) {
    const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error(
        "Falta la variable de entorno DATABASE_URL (o POSTGRES_URL) para conectar con la base de datos."
      );
    }
    client = neon(connectionString);
  }
  return client;
}

export const sql: SqlFn = ((...args: Parameters<SqlFn>) => getClient()(...args)) as SqlFn;

let ready: Promise<void> | null = null;

export function ensureSchema() {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS admin_credentials (
          id INT PRIMARY KEY DEFAULT 1,
          username TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          CHECK (id = 1)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          section TEXT PRIMARY KEY,
          data JSONB NOT NULL
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS appointments (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          specialty TEXT NOT NULL,
          doctor TEXT,
          message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return ready;
}
