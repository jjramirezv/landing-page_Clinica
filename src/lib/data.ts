export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Doctores", href: "#doctores" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export const STATS = [
  { value: "15+", label: "Años de experiencia" },
  { value: "25+", label: "Especialistas" },
  { value: "50K+", label: "Pacientes atendidos" },
  { value: "24/7", label: "Emergencias" },
];

export const SPECIALTIES = [
  {
    icon: "HeartPulse",
    name: "Cardiología",
    description:
      "Diagnóstico y tratamiento integral de enfermedades del corazón y sistema circulatorio.",
  },
  {
    icon: "Baby",
    name: "Pediatría",
    description:
      "Cuidado especializado para el crecimiento y desarrollo saludable de niños y adolescentes.",
  },
  {
    icon: "Bone",
    name: "Traumatología",
    description:
      "Tratamiento de lesiones óseas, musculares y articulares con tecnología de vanguardia.",
  },
  {
    icon: "Eye",
    name: "Oftalmología",
    description:
      "Salud visual completa: exámenes, cirugías y tratamiento de enfermedades oculares.",
  },
  {
    icon: "Brain",
    name: "Neurología",
    description:
      "Diagnóstico y manejo especializado de trastornos del sistema nervioso.",
  },
  {
    icon: "Sparkles",
    name: "Odontología",
    description:
      "Cuidado dental integral para toda la familia, desde limpiezas hasta ortodoncia.",
  },
] as const;

export const DOCTORS = [
  {
    name: "Dra. Camila Reyes",
    specialty: "Cardiología",
    bio: "15 años de experiencia en cardiología intervencionista y prevención cardiovascular.",
    initials: "CR",
  },
  {
    name: "Dr. Andrés Molina",
    specialty: "Pediatría",
    bio: "Especialista en pediatría general y neonatología, enfocado en el bienestar infantil.",
    initials: "AM",
  },
  {
    name: "Dra. Valentina Ríos",
    specialty: "Neurología",
    bio: "Experta en trastornos neurológicos crónicos y rehabilitación cognitiva.",
    initials: "VR",
  },
  {
    name: "Dra. Isabel Torres",
    specialty: "Ginecología",
    bio: "Atención integral en salud femenina, con enfoque humano y preventivo.",
    initials: "IT",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Laura Fernández",
    text: "El equipo de MediVital fue increíblemente atento con mi hijo. La pediatra explicó todo con calma y claridad.",
    rating: 5,
  },
  {
    name: "Jorge Ramírez",
    text: "Agendé mi chequeo general en minutos y me atendieron puntualmente. Excelente servicio para gente ocupada como yo.",
    rating: 5,
  },
  {
    name: "Roberto Sánchez",
    text: "La atención con mi padre adulto mayor fue paciente y muy profesional. Nos sentimos acompañados en todo momento.",
    rating: 5,
  },
  {
    name: "Daniela Castro",
    text: "Instalaciones limpias, doctores muy capacitados y un proceso de citas online súper sencillo. Totalmente recomendado.",
    rating: 5,
  },
] as const;

export const FAQS = [
  {
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "Atendemos de lunes a viernes de 7:00 a.m. a 8:00 p.m., y sábados de 8:00 a.m. a 2:00 p.m. El servicio de emergencias está disponible las 24 horas, los 7 días de la semana.",
  },
  {
    question: "¿Qué seguros médicos aceptan?",
    answer:
      "Trabajamos con las principales aseguradoras del país. Contáctanos por WhatsApp o teléfono para confirmar la cobertura específica de tu póliza.",
  },
  {
    question: "¿Cuentan con estacionamiento?",
    answer:
      "Sí, contamos con estacionamiento gratuito para pacientes dentro de las instalaciones de la clínica, con espacios preferenciales para adultos mayores.",
  },
  {
    question: "¿Cómo funciona el servicio de emergencias?",
    answer:
      "Nuestra sala de emergencias opera 24/7 con personal médico disponible en todo momento. Ante una urgencia, puedes llamarnos directamente o presentarte en nuestras instalaciones.",
  },
];

export const SCHEDULE = [
  { day: "Lunes – Viernes", hours: "7:00 a. m. – 8:00 p. m." },
  { day: "Sábados", hours: "8:00 a. m. – 2:00 p. m." },
  { day: "Domingos", hours: "Cerrado (solo emergencias)" },
  { day: "Emergencias", hours: "24 horas / 7 días" },
];

export const SPECIALTY_OPTIONS = [
  "Medicina General",
  "Cardiología",
  "Pediatría",
  "Ginecología",
  "Traumatología",
  "Dermatología",
  "Oftalmología",
  "Neurología",
  "Odontología",
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
];

export const CLINIC = {
  name: "MediVital",
  fullName: "Clínica MediVital — Centro Médico Integral",
  phone: "+50212345678",
  phoneDisplay: "+502 1234-5678",
  whatsappMessage: "Hola, deseo agendar una cita en Clínica MediVital",
  address: "Av. Reforma 123, Ciudad de Guatemala",
};
