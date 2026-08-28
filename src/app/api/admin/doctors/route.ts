import { NextResponse } from "next/server";
import { getContent, updateContentSection, type Doctor } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

function sanitize(list: unknown): Doctor[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      name: String(item.name ?? "").slice(0, 120),
      specialty: String(item.specialty ?? "").slice(0, 120),
      experience: String(item.experience ?? "").slice(0, 120),
      registration: String(item.registration ?? "").slice(0, 60),
      image: String(item.image ?? "").slice(0, 500),
      intro: String(item.intro ?? "").slice(0, 1000),
    }))
    .filter((doctor) => doctor.name && doctor.specialty);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ doctors: content.doctors });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const doctors = sanitize(body?.doctors);

  const content = await updateContentSection("doctors", doctors);
  return NextResponse.json({ doctors: content.doctors });
}
