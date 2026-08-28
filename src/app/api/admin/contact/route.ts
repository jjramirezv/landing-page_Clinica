import { NextResponse } from "next/server";
import { getContent, updateContentSection, DEFAULT_CONTENT, type ContactInfo } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

function sanitize(input: unknown): ContactInfo {
  const item = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  return {
    phone: String(item.phone ?? DEFAULT_CONTENT.contact.phone).slice(0, 40),
    phoneDisplay: String(item.phoneDisplay ?? DEFAULT_CONTENT.contact.phoneDisplay).slice(0, 40),
    whatsapp: String(item.whatsapp ?? DEFAULT_CONTENT.contact.whatsapp).slice(0, 40),
    whatsappMessage: String(item.whatsappMessage ?? DEFAULT_CONTENT.contact.whatsappMessage).slice(0, 300),
    address: String(item.address ?? DEFAULT_CONTENT.contact.address).slice(0, 300),
    hours: String(item.hours ?? DEFAULT_CONTENT.contact.hours).slice(0, 200),
  };
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ contact: content.contact });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const contact = sanitize(body?.contact);

  const content = await updateContentSection("contact", contact);
  return NextResponse.json({ contact: content.contact });
}
