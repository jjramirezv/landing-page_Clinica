import { NextResponse } from "next/server";
import { getContent, updateContentSection, type Specialty } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

function sanitize(list: unknown): Specialty[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      title: String(item.title ?? "").slice(0, 120),
      description: String(item.description ?? "").slice(0, 300),
      image: String(item.image ?? "").slice(0, 500),
    }))
    .filter((specialty) => specialty.title);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ specialties: content.specialties });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const specialties = sanitize(body?.specialties);

  const content = await updateContentSection("specialties", specialties);
  return NextResponse.json({ specialties: content.specialties });
}
