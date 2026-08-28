import { NextResponse } from "next/server";
import { getContent, updateContentSection, type Sede } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

function sanitize(list: unknown): Sede[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      nombre: String(item.nombre ?? "").slice(0, 120),
      direccion: String(item.direccion ?? "").slice(0, 300),
      image: String(item.image ?? "").slice(0, 500),
    }))
    .filter((sede) => sede.nombre);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ sedes: content.sedes });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const sedes = sanitize(body?.sedes);

  const content = await updateContentSection("sedes", sedes);
  return NextResponse.json({ sedes: content.sedes });
}
