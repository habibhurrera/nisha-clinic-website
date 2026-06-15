"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useId } from "react";
import { CONTACT, LOCATIONS } from "@/lib/constants";

/* ── Types ──────────────────────────────────────────────────── */
interface FormData {
  name:     string;
  phone:    string;
  location: string;
  date:     string;
  concern:  string;
  honeypot: string;
}
interface FormErrors {
  name?:     string;
  phone?:    string;
  location?: string;
  date?:     string;
  concern?:  string;
}

/* ── Options ────────────────────────────────────────────────── */
const LOCATION_OPTIONS = [
  { value: "",          label: "Select a location…" },
  { value: "nazimabad", label: "Private Clinic — Nazimabad" },
  { value: "rangers",   label: "Sindh Rangers Hospital" },
  { value: "mamji",     label: "Mamji Hospital" },
  { value: "rims",      label: "RIMS Trauma Hospital" },
];

const CONCERNS = [
  { value: "",             label: "Select health concern…" },
  { value: "Antenatal / Pregnancy Care",       label: "Antenatal / Pregnancy Care" },
  { value: "Normal or C-Section Delivery",     label: "Normal or C-Section Delivery" },
  { value: "High-Risk Pregnancy",              label: "High-Risk Pregnancy" },
  { value: "General Gynaecology",              label: "General Gynaecology" },
  { value: "Menstrual Disorders",              label: "Menstrual Disorders" },
  { value: "PCOS Management",                 label: "PCOS Management" },
  { value: "Pelvic Pain / Infection",         label: "Pelvic Pain / Infection" },
  { value: "Breast Examination",              label: "Breast Examination" },
  { value: "Menopause Care",                  label: "Menopause Care" },
  { value: "Laparoscopic Surgery",            label: "Laparoscopic Surgery" },
  { value: "Hysteroscopy",                    label: "Hysteroscopy" },
  { value: "Fertility / Infertility",         label: "Fertility / Infertility" },
  { value: "Other / General Consultation",    label: "Other / General Consultation" },
];

/* ── Location label helper ──────────────────────────────────── */
function locationLabel(val: string) {
  return LOCATION_OPTIONS.find(o => o.value === val)?.label ?? val;
}

/* ── Build WhatsApp message ─────────────────────────────────── */
function buildWhatsAppURL(form: FormData): string {
  const msg = [
    "🌸 *Appointment Request — Dr. Nisha Tabassum*",
    "",
    `👤 *Name:* ${form.name.trim()}`,
    `📞 *Phone:* ${form.phone.trim()}`,
    `📍 *Location:* ${locationLabel(form.location)}`,
    `📅 *Preferred Date:* ${form.date}`,
    `🩺 *Concern:* ${form.concern}`,
    "",
    "_Please confirm my appointment slot. Thank you!_",
  ].join("\n");

  return `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(msg)}`;
}

/* ── Validation ─────────────────────────────────────────────── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  const digits = data.phone.replace(/\D/g, "");
  if (!data.phone.trim() || digits.length < 10 || digits.length > 13)
    errors.phone = "Enter a valid Pakistani phone number (e.g. 0327-3885120).";
  if (!data.location)
    errors.location = "Please choose a clinic location.";
  if (!data.date)
    errors.date = "Please select a preferred date.";
  else {
    const chosen = new Date(data.date);
    const today  = new Date(); today.setHours(0,0,0,0);
    if (chosen < today) errors.date = "Date cannot be in the past.";
  }
  if (!data.concern)
    errors.concern = "Please select a health concern.";
  return errors;
}

function minDate() {
  return new Date().toISOString().split("T")[0];
}

/* ── Field wrapper ──────────────────────────────────────────── */
function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="label-field">
        {label}{required && <span className="text-blush-500 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-4 }} transition={{ duration:0.2 }}
            className="font-sans text-xs text-blush-600 flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function AppointmentForm() {
  const uid = useId();
  const [form, setForm]     = useState<FormData>({ name:"", phone:"", location:"", date:"", concern:"", honeypot:"" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setForm(prev => ({ ...prev, [field]: val }));
      if (touched[field]) setErrors(validate({ ...form, [field]: val }));
    };

  const blur = (field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const fieldClass = (field: keyof FormErrors) =>
    `input-field ${touched[field] && errors[field] ? "border-blush-400 ring-1 ring-blush-300" :
      touched[field] && !errors[field] ? "border-brand-400" : ""}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // bot trap

    // Mark all fields touched
    setTouched({ name:true, phone:true, location:true, date:true, concern:true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // ✅ Open WhatsApp with pre-filled booking message
    const url = buildWhatsAppURL(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  /* ── Success screen ─────────────────────────────────────────── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity:0, scale:0.96 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        className="text-center py-14 px-6"
      >
        <motion.div
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:0.15, duration:0.5, type:"spring", stiffness:200 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-glow-brand"
          style={{ background:"linear-gradient(135deg,#f0f7f4,#d9ece4)" }}
        >
          ✅
        </motion.div>
        <h3 className="font-serif text-2xl md:text-3xl text-navy-800 mb-3">WhatsApp Opened!</h3>
        <p className="font-sans text-neutral-500 mb-2 max-w-sm mx-auto">
          Your appointment details have been sent to WhatsApp. Please tap <strong>Send</strong> in the chat to complete your booking request.
        </p>
        <p className="font-sans text-xs text-neutral-400 mb-8">
          Dr. Nisha's team will confirm your slot shortly via WhatsApp or call.
        </p>
        <a
          href={buildWhatsAppURL(form)}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary inline-flex gap-2 mb-4"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Open WhatsApp Again
        </a>
        <br/>
        <button
          onClick={() => { setSubmitted(false); setForm({ name:"",phone:"",location:"",date:"",concern:"",honeypot:"" }); setTouched({}); setErrors({}); }}
          className="font-sans text-sm text-neutral-400 hover:text-neutral-600 transition-colors mt-2"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  /* ── Form ─────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby={`${uid}-heading`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Full Name */}
        <Field label="Full Name" error={touched.name ? errors.name : undefined} required>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <input type="text" value={form.name} onChange={set("name")} onBlur={blur("name")}
              placeholder="e.g. Fatima Khan"
              className={`${fieldClass("name")} pl-10`}
              autoComplete="name"
            />
          </div>
        </Field>

        {/* Phone */}
        <Field label="Phone / WhatsApp" error={touched.phone ? errors.phone : undefined} required>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </span>
            <input type="tel" value={form.phone} onChange={set("phone")} onBlur={blur("phone")}
              placeholder="0327-3885120"
              className={`${fieldClass("phone")} pl-10`}
              autoComplete="tel"
            />
          </div>
        </Field>

        {/* Location */}
        <Field label="Preferred Location" error={touched.location ? errors.location : undefined} required>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </span>
            <select value={form.location} onChange={set("location")} onBlur={blur("location")}
              className={`${fieldClass("location")} pl-10 appearance-none cursor-pointer`}
            >
              {LOCATION_OPTIONS.map(o => (
                <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
        </Field>

        {/* Date */}
        <Field label="Preferred Date" error={touched.date ? errors.date : undefined} required>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
            <input type="date" value={form.date} onChange={set("date")} onBlur={blur("date")}
              min={minDate()}
              className={`${fieldClass("date")} pl-10 cursor-pointer`}
            />
          </div>
        </Field>

        {/* Concern — full width */}
        <div className="sm:col-span-2">
          <Field label="Health Concern" error={touched.concern ? errors.concern : undefined} required>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </span>
              <select value={form.concern} onChange={set("concern")} onBlur={blur("concern")}
                className={`${fieldClass("concern")} pl-10 appearance-none cursor-pointer`}
              >
                {CONCERNS.map(o => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden style={{ position:"absolute", left:"-9999px", opacity:0, pointerEvents:"none" }}>
        <input type="text" name="website" tabIndex={-1} value={form.honeypot} onChange={set("honeypot")} autoComplete="off"/>
      </div>

      {/* Info note */}
      <div className="mt-5 p-4 rounded-2xl border border-warm-200 flex items-start gap-3" style={{ background:"#f9f6f0" }}>
        <span className="text-lg">📲</span>
        <p className="font-sans text-xs text-neutral-500 leading-relaxed">
          Clicking <strong>Request Appointment</strong> will open WhatsApp with your details pre-filled.
          Just tap <strong>Send</strong> to submit your request. We'll confirm your slot within a few hours.
        </p>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale:1.02 }}
        whileTap={{ scale:0.98 }}
        className="btn-blush w-full mt-6 py-4 text-base"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Request Appointment via WhatsApp
      </motion.button>

      <p className="font-sans text-xs text-center text-neutral-400 mt-3">
        We'll confirm your slot within a few hours.
      </p>
    </form>
  );
}
