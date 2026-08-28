import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("Falta DATABASE_URL (o POSTGRES_URL) en el entorno. Corre esto con las variables de Vercel cargadas.");
  process.exit(1);
}

const sql = neon(connectionString);
const DATA_DIR = path.join(process.cwd(), "data");

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function main() {
  console.log("Creando tablas...");
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

  console.log("Sembrando credenciales de admin (demo-clinica / demo-clinica)...");
  const passwordHash = await bcrypt.hash("demo-clinica", 10);
  await sql`
    INSERT INTO admin_credentials (id, username, password_hash)
    VALUES (1, 'demo-clinica', ${passwordHash})
    ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, password_hash = EXCLUDED.password_hash
  `;

  console.log("Migrando contenido del sitio (data/content.json si existe)...");
  const content = await readJson("content.json", null);
  if (content) {
    for (const section of ["doctors", "specialties", "sedes", "contact"]) {
      if (content[section] === undefined) continue;
      await sql`
        INSERT INTO site_content (section, data)
        VALUES (${section}, ${JSON.stringify(content[section])}::jsonb)
        ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data
      `;
    }
  } else {
    console.log("  No se encontró data/content.json, se usarán los valores por defecto en el primer request.");
  }

  console.log("Migrando citas existentes (data/appointments.json si existe)...");
  const appointments = await readJson("appointments.json", []);
  for (const appointment of appointments) {
    await sql`
      INSERT INTO appointments (id, name, phone, specialty, doctor, message, created_at)
      VALUES (
        ${appointment.id},
        ${appointment.name},
        ${appointment.phone},
        ${appointment.specialty},
        ${appointment.doctor ?? null},
        ${appointment.message ?? null},
        ${appointment.createdAt}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  ${appointments.length} cita(s) procesada(s).`);

  console.log("Listo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
