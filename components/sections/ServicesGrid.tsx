"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "gynecology", label: "Gynaecology"   },
  { id: "obstetrics", label: "Obstetrics"    },
  { id: "surgical",   label: "Surgical"      },
  { id: "fertility",  label: "Fertility"     },
  { id: "all",        label: "All Services"  },
];

const SERVICES = [
  // ── Gynaecology ──────────────────────────────────────────────
  { id:"general-gyn", icon:"🩺", title:"General Gynaecology",        desc:"Regular women's health check-ups, pelvic exams, and cervical screenings to keep you healthy at every age.",                                    color:"#f0f7f4", accent:"#2e7d64", category:"gynecology" },
  { id:"menstrual",   icon:"📅", title:"Menstrual Problems",          desc:"If your periods are irregular, very painful, or too heavy — Dr. Nisha can find out why and help you feel better.",                            color:"#fae8ea", accent:"#cc5a6b", category:"gynecology" },
  { id:"pcos",        icon:"🔄", title:"PCOS Treatment",              desc:"PCOS causes hormonal imbalance, weight gain, and irregular periods. We offer a clear plan to manage your symptoms and improve your health.",   color:"#faf0f7", accent:"#8b4fa1", category:"gynecology" },
  { id:"pelvic",      icon:"🦠", title:"Pelvic Infections",           desc:"Pain or discomfort in your lower abdomen could be an infection. We diagnose and treat it quickly so you recover fast.",                       color:"#f0f4f7", accent:"#2b6584", category:"gynecology" },
  { id:"breast",      icon:"🩻", title:"Breast Check-up",             desc:"A thorough breast examination to check for any lumps, pain, or unusual changes. Early detection saves lives.",                               color:"#fdf5f6", accent:"#cc5a6b", category:"gynecology" },
  { id:"menopause",   icon:"🌿", title:"Menopause Care",              desc:"Hot flashes, mood changes, and sleep problems during menopause are common. We help you manage them comfortably.",                             color:"#f0f7f4", accent:"#3a7d5b", category:"gynecology" },

  // ── Obstetrics ───────────────────────────────────────────────
  { id:"obstetrics",  icon:"🏥", title:"Pregnancy Care",              desc:"Complete care throughout your pregnancy — from your first visit to delivery. We make sure you and your baby stay safe and healthy.",          color:"#fae8ea", accent:"#cc5a6b", category:"obstetrics" },
  { id:"antenatal",   icon:"🤰", title:"Antenatal Check-ups",         desc:"Regular pregnancy visits with ultrasound scans and blood tests to monitor your baby's growth every step of the way.",                        color:"#fdf5f6", accent:"#cc5a6b", category:"obstetrics" },
  { id:"delivery",    icon:"👶", title:"Normal & C-Section Delivery", desc:"Whether you have a normal delivery or need a C-section, Dr. Nisha handles both safely with full care before and after.",                     color:"#fff8f0", accent:"#c4793a", category:"obstetrics" },
  { id:"high-risk",   icon:"⚠️", title:"High-Risk Pregnancy",        desc:"If you have diabetes, high blood pressure, or twins, your pregnancy needs extra attention. We provide that specialised care.",                 color:"#fef9ec", accent:"#b8860b", category:"obstetrics" },
  { id:"pain",        icon:"💊", title:"Pregnancy Pain Relief",       desc:"We help manage pain during pregnancy and labour using safe, effective methods so you stay comfortable.",                                      color:"#f0f4f7", accent:"#2b6584", category:"obstetrics" },
  { id:"miscarriage", icon:"🌸", title:"Miscarriage Support",         desc:"Losing a pregnancy is very difficult. We provide gentle medical care and emotional support to help you through this time.",                   color:"#fdf5f6", accent:"#cc5a6b", category:"obstetrics" },

  // ── Surgical ─────────────────────────────────────────────────
  { id:"laparoscopy", icon:"🔬", title:"Laparoscopic Surgery",        desc:"Small keyhole surgery with no large cuts. You recover faster, have less pain, and go home sooner than with traditional surgery.",            color:"#f0f7f4", accent:"#2e7d64", category:"surgical"  },
  { id:"hysteroscopy",icon:"🏥", title:"Hysteroscopy",                desc:"A simple procedure to look inside the uterus and remove small problems like polyps or fibroids causing pain or bleeding.",                   color:"#f0f4f7", accent:"#2b6584", category:"surgical"  },
  { id:"tubal",       icon:"✂️", title:"Tubal Ligation",              desc:"A permanent family planning option for women who do not want more children. It is safe, quick, and done under anaesthesia.",                 color:"#fef9ec", accent:"#b8860b", category:"surgical"  },

  // ── Fertility ─────────────────────────────────────────────────
  { id:"fertility",   icon:"💫", title:"Fertility Consultation",      desc:"If you are trying to have a baby, we check both partners, find the reason, and guide you on the best next steps.",                           color:"#fff8f0", accent:"#c4793a", category:"fertility" },
  { id:"infertility", icon:"🌱", title:"Infertility Treatment",       desc:"We offer medical and surgical treatments to help couples who are having difficulty conceiving, with a personalised plan for each couple.",    color:"#f0f7f4", accent:"#2e7d64", category:"fertility" },

  // ── Obstetrics — additional ──────────────────────────────────
  { id:"svd",          icon:"🤱", title:"Normal Vaginal Delivery (SVD)",    desc:"Dr. Nisha supports spontaneous vaginal deliveries with full monitoring and care, ensuring a safe and natural birth for mother and baby.",                                                    color:"#fae8ea", accent:"#cc5a6b", category:"obstetrics" },
  { id:"instrumental", icon:"🩺", title:"Instrumental Delivery",             desc:"When labour needs assistance, Dr. Nisha is skilled in forceps and vacuum-assisted deliveries to safely guide the baby out when needed.",                                                       color:"#fff8f0", accent:"#c4793a", category:"obstetrics" },
  { id:"cerclage",     icon:"🧵", title:"Cerclage Application",              desc:"A cervical stitch (cerclage) is placed to prevent premature birth or recurrent pregnancy loss in women with a weak or short cervix.",                                                         color:"#fdf5f6", accent:"#cc5a6b", category:"obstetrics" },

  // ── Surgical — additional ────────────────────────────────────
  { id:"abdominal-hyst",  icon:"🔪", title:"Total Abdominal Hysterectomy",  desc:"Surgical removal of the uterus through an abdominal incision, recommended for fibroids, cancer, or chronic pelvic pain that has not responded to other treatments.",                          color:"#f0f4f7", accent:"#2b6584", category:"surgical"  },
  { id:"vaginal-hyst",    icon:"⚕️", title:"Vaginal Hysterectomy",          desc:"Removal of the uterus through the vagina with no abdominal incision, resulting in a faster recovery, less pain, and no visible scar.",                                                        color:"#f0f7f4", accent:"#2e7d64", category:"surgical"  },
  { id:"myomectomy",      icon:"🔬", title:"Myomectomy (Fibroid Removal)",  desc:"Surgical removal of uterine fibroids while preserving the uterus — ideal for women who wish to maintain their fertility but are suffering from fibroid-related symptoms.",                    color:"#faf0f7", accent:"#8b4fa1", category:"surgical"  },
  { id:"obs-hyst",        icon:"🏥", title:"Obstetrical Hysterectomy",      desc:"An emergency surgical procedure to remove the uterus during or after childbirth to control life-threatening bleeding and save the mother's life.",                                           color:"#fef9ec", accent:"#b8860b", category:"surgical"  },
  { id:"laparotomy",      icon:"🩻", title:"Laparotomy",                    desc:"An open abdominal surgery used to diagnose or treat serious gynaecological conditions including ectopic pregnancy, ovarian cysts, or abdominal emergencies.",                                  color:"#f0f4f7", accent:"#2b6584", category:"surgical"  },

  // ── Fertility — additional ───────────────────────────────────
  { id:"lap-dye",         icon:"💉", title:"Laparoscopy & Dye Test",        desc:"A keyhole procedure where dye is passed through the fallopian tubes to check if they are open and functioning — a key diagnostic step in evaluating female infertility.",                    color:"#f0f7f4", accent:"#2e7d64", category:"fertility" },
  { id:"ovulation",   icon:"📊", title:"Ovulation Tracking",          desc:"We use ultrasound to find your most fertile days and guide you on the best time to try for a baby naturally.",                              color:"#faf0f7", accent:"#8b4fa1", category:"fertility" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  return (
    <motion.div variants={cardVariant} layout>
      <div
        className="group flex flex-col h-full rounded-3xl p-6 bg-white border border-warm-200
          shadow-card-soft hover:shadow-card-hover hover:-translate-y-1.5
          transition-all duration-300 overflow-hidden relative"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
          style={{ background: s.color }}
        />
        <div className="relative z-10 flex flex-col h-full">
          <div
            className="w-[3.25rem] h-[3.25rem] rounded-2xl flex items-center justify-center text-2xl mb-5
              group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
            style={{ background: s.color }}
          >
            {s.icon}
          </div>
          <h3 className="font-serif text-lg text-navy-800 font-semibold mb-2.5 leading-snug group-hover:text-navy-900 transition-colors">
            {s.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-neutral-500 flex-1">
            {s.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("gynecology");
  const visible = compact ? SERVICES.slice(0, 6) : (active === "all" ? SERVICES : SERVICES.filter(s => s.category === active));

  return (
    <section className="section-py" style={{ background: "linear-gradient(180deg, #fdfcfa 0%, #f9f6f0 100%)" }} id="services">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="chip-brand mb-5">Our Services</span>
          <h2 className="heading-section text-balance mb-4">
            Complete Women's <span className="italic" style={{ color: "#2e7d64" }}>Healthcare</span>
          </h2>
          <div className="divider-brand mx-auto mb-5" />
          <p className="body-lead">
            From routine gynaecological check-ups to complex laparoscopic procedures —
            expert, compassionate care at every stage of a woman's life.
          </p>
        </motion.div>

        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                className={`font-sans text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200
                  ${active === cat.id ? "bg-brand-500 text-white border-brand-500 shadow-md" : "bg-white text-neutral-600 border-warm-200 hover:border-brand-300 hover:text-brand-600"}`}
              >{cat.label}</button>
            ))}
          </motion.div>
        )}

        <motion.div
          key={active}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden" animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visible.map(s => <ServiceCard key={s.id} s={s} />)}
        </motion.div>

        {compact && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-14"
          >
            <Link href="/services" className="btn-outline-brand">View All Services →</Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
