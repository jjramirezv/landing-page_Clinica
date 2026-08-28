import { sql, ensureSchema } from "@/lib/db";

export type Doctor = {
  name: string;
  specialty: string;
  experience: string;
  registration: string;
  image: string;
  intro: string;
};

export type Specialty = {
  title: string;
  description: string;
  image: string;
};

export type Sede = {
  nombre: string;
  direccion: string;
  image: string;
};

export type ContactInfo = {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  address: string;
  hours: string;
};

export type SiteContent = {
  doctors: Doctor[];
  specialties: Specialty[];
  sedes: Sede[];
  contact: ContactInfo;
};

export const DEFAULT_CONTENT: SiteContent = {
  doctors: [
    {
      name: "Dra. María López",
      specialty: "Cardiología",
      experience: "12 años de experiencia",
      registration: "CMP 45821",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
      intro: "Especialista en prevención cardiovascular e hipertensión arterial, con enfoque en el seguimiento integral del corazón.",
    },
    {
      name: "Dr. Carlos Ruiz",
      specialty: "Pediatría",
      experience: "10 años de experiencia",
      registration: "CMP 39214",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
      intro: "Acompaña el crecimiento y desarrollo de niños y adolescentes con atención cercana y certificación en pediatría integral.",
    },
    {
      name: "Dr. Jorge Castillo",
      specialty: "Traumatología",
      experience: "13 años de experiencia",
      registration: "CMP 38077",
      image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&w=800&q=80",
      intro: "Especialista en traumatología y ortopedia, con enfoque en lesiones deportivas y recuperación funcional.",
    },
    {
      name: "Dra. Valeria Sandoval",
      specialty: "Oftalmología",
      experience: "8 años de experiencia",
      registration: "CMP 43590",
      image: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?auto=format&fit=crop&w=800&q=80",
      intro: "Certificada en oftalmología clínica y quirúrgica, con experiencia en salud visual integral para toda la familia.",
    },
    {
      name: "Dr. Andrés Solís",
      specialty: "Neurología",
      experience: "11 años de experiencia",
      registration: "CMP 40218",
      image: "https://images.unsplash.com/photo-1645066928295-2506defde470?auto=format&fit=crop&w=800&q=80",
      intro: "Especialista en neurología, dedicado al diagnóstico y manejo de trastornos del sistema nervioso.",
    },
    {
      name: "Dra. Camila Rojas",
      specialty: "Odontología",
      experience: "9 años de experiencia",
      registration: "CMP 42931",
      image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?auto=format&fit=crop&w=800&q=80",
      intro: "Certificada en odontología integral, con formación en estética dental y salud bucal preventiva.",
    },
  ],
  specialties: [
    {
      title: "Cardiología",
      description: "Salud cardiovascular en cada etapa de tu vida.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Pediatría",
      description: "Crecimiento y desarrollo saludable para niños.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Traumatología",
      description: "Lesiones óseas, musculares y articulares.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Oftalmología",
      description: "Exámenes visuales y salud ocular integral.",
      image: "https://images.unsplash.com/photo-1542432389-a40026383873?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Neurología",
      description: "Diagnóstico y manejo del sistema nervioso.",
      image: "https://images.unsplash.com/photo-1758691463110-697a814b2033?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Odontología",
      description: "Cuidado dental integral para toda la familia.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
    },
  ],
  sedes: [
    {
      nombre: "Sede Zona 10",
      direccion: "Av. Reforma 123, Zona 10, Ciudad de Guatemala",
      image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=900&q=80",
    },
    {
      nombre: "Sede Zona 15",
      direccion: "Blvd. Vista Hermosa 4-56, Zona 15, Ciudad de Guatemala",
      image: "https://images.unsplash.com/photo-1615770922480-0b9ae80afeba?auto=format&fit=crop&w=900&q=80",
    },
    {
      nombre: "Sede Zona 4",
      direccion: "7a Avenida 3-21, Zona 4, Ciudad de Guatemala",
      image: "https://images.unsplash.com/photo-1580615631392-aeb060d526e4?auto=format&fit=crop&w=900&q=80",
    },
  ],
  contact: {
    phone: "+50212345678",
    phoneDisplay: "+502 1234-5678",
    whatsapp: "50212345678",
    whatsappMessage: "Hola, deseo agendar una cita en Clínica Vitalis Salud",
    address: "Av. Reforma 123, Ciudad de Guatemala",
    hours: "Lunes a viernes, 7:00 a. m. a 8:00 p. m.",
  },
};

const SECTIONS = ["doctors", "specialties", "sedes", "contact"] as const;

async function ensureContentSeeded() {
  await ensureSchema();
  for (const section of SECTIONS) {
    await sql`
      INSERT INTO site_content (section, data)
      VALUES (${section}, ${JSON.stringify(DEFAULT_CONTENT[section])}::jsonb)
      ON CONFLICT (section) DO NOTHING
    `;
  }
}

export async function getContent(): Promise<SiteContent> {
  await ensureContentSeeded();
  const rows = await sql`SELECT section, data FROM site_content`;
  const bySection = new Map(rows.map((row) => [row.section as string, row.data]));

  return {
    doctors: (bySection.get("doctors") as SiteContent["doctors"]) ?? DEFAULT_CONTENT.doctors,
    specialties: (bySection.get("specialties") as SiteContent["specialties"]) ?? DEFAULT_CONTENT.specialties,
    sedes: (bySection.get("sedes") as SiteContent["sedes"]) ?? DEFAULT_CONTENT.sedes,
    contact: { ...DEFAULT_CONTENT.contact, ...(bySection.get("contact") as Partial<ContactInfo>) },
  };
}

export async function updateContentSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K]
): Promise<SiteContent> {
  await ensureContentSeeded();
  await sql`
    INSERT INTO site_content (section, data)
    VALUES (${section}, ${JSON.stringify(value)}::jsonb)
    ON CONFLICT (section) DO UPDATE SET data = EXCLUDED.data
  `;
  return getContent();
}
