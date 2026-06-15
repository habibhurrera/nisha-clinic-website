export const SITE_NAME = "Dr. Nisha Tabassum";
export const SITE_TAGLINE = "Consultant Gynaecologist & Laparoscopic Surgeon";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drnishatabassum.com";

export const CONTACT = {
  phone:          "0327-3885120",
  phoneIntl:      "+923273885120",
  whatsapp:       "0327-3885120",
  whatsappIntl:   "+923273885120",
  whatsappMsg:    "Hi, I would like to book an appointment with Dr. Nisha Tabassum.",
  email:          "info@drnishatabassum.com",
  facebook:       "https://facebook.com/drnishatabassum",
  instagram:      "https://instagram.com/drnishatabassum",
};

export const LOCATIONS: Location[] = [
  {
    id: "nazimabad",
    name: "Private Clinic — Nazimabad",
    address: "Nazimabad, Karachi, Sindh, Pakistan",
    timings: "Mon, Wed, Fri: 06:00 PM – 08:00 PM | Sat: 01:00 PM – 03:00 PM",
    phone: "+923273885120",
    mapUrl: "https://maps.app.goo.gl/b4iGn9QBAr3Ct68S7",
    lat: 24.9215,
    lng: 67.0601,
  },
  {
    id: "rangers",
    name: "Sindh Rangers Hospital",
    address: "Sindh Rangers Hospital, Karachi",
    timings: "Mon – Fri: 08:30 AM – 02:30 PM",
    phone: "+923273885120",
    mapUrl: "https://maps.google.com/maps?q=Sindh+Rangers+Hospital+Karachi",
    lat: 24.8607,
    lng: 67.0011,
  },
  {
    id: "mamji",
    name: "Mamji Hospital",
    address: "Mamji Hospital, Karachi",
    timings: "Tue – Thu: 04:00 PM – 06:00 PM | Sat: 03:00 PM – 05:00 PM",
    phone: "+923273885120",
    mapUrl: "https://maps.google.com/maps?q=Mamji+Hospital+Karachi",
    lat: 24.8700,
    lng: 67.0100,
  },
  {
    id: "rims",
    name: "RIMS Trauma Hospital",
    address: "RIMS Trauma Hospital, Karachi",
    timings: "Sat: 12:00 PM – 02:00 PM",
    phone: "+923273885120",
    mapUrl: "https://maps.google.com/maps?q=RIMS+Trauma+Hospital+Karachi",
    lat: 24.8550,
    lng: 67.0200,
  },
];

export type Location = {
  id: string;
  name: string;
  address: string;
  timings: string;
  phone: string;
  mapUrl: string;
  lat: number;
  lng: number;
};

export const SERVICES = [
  { id: "antenatal",    title: "Antenatal Care",              icon: "🤰" },
  { id: "laparoscopy",  title: "Laparoscopic Surgery",        icon: "🔬" },
  { id: "hysteroscopy", title: "Hysteroscopy",                icon: "🏥" },
  { id: "pcos",         title: "PCOS Management",             icon: "💊" },
  { id: "fertility",    title: "Fertility Consultations",     icon: "🌸" },
  { id: "menopause",    title: "Menopause Care",              icon: "🌿" },
  { id: "fibroids",     title: "Fibroid Treatment",           icon: "⚕️"  },
  { id: "colposcopy",   title: "Colposcopy & Cervical Care",  icon: "🔭" },
];
