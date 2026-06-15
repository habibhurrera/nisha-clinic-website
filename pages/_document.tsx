import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1a9086" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="dGZY9-wdXDC_kDVdHo07ddGu249rzog5pHi8GLhq3P4" />
        <meta name="author" content="Dr. Nisha Tabassum" />
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi, Sindh, Pakistan" />
        <meta name="geo.position" content="24.9215;67.0601" />
        <meta name="ICBM" content="24.9215, 67.0601" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />

        {/* Favicon */}
        <link rel="icon"             href="/favicon.ico" />
        <link rel="icon"             href="/favicon.svg"          type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest"         href="/site.webmanifest" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Open Graph defaults */}
        <meta property="og:type"         content="website" />
        <meta property="og:site_name"    content="Dr. Nisha Tabassum — Gynaecologist Karachi" />
        <meta property="og:locale"       content="en_PK" />
        <meta property="og:image"        content="https://www.drnishatabassum.com/og-image.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"    content="Dr. Nisha Tabassum - Consultant Gynaecologist Karachi" />

        {/* Twitter Card */}
        <meta name="twitter:card"    content="summary_large_image" />
        <meta name="twitter:image"   content="https://www.drnishatabassum.com/og-image.jpg" />
        <meta name="twitter:creator" content="@drnishatabassum" />

        {/* JSON-LD — Physician */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Nisha Tabassum",
              "alternateName": ["Nisha Tabassum", "Dr Nisha", "Dr. Nisha Gynecologist Karachi"],
              "description": "Dr. Nisha Tabassum is a PMDC-Verified Consultant Gynaecologist and Laparoscopic Surgeon in Karachi with over 13 years of experience. Specialist in PCOS, high-risk pregnancy, infertility, laparoscopic surgery, antenatal care, and menopause management.",
              "url": "https://www.drnishatabassum.com",
              "telephone": "+923273885120",
              "image": "https://www.drnishatabassum.com/images/about/doctor.jpg",
              "priceRange": "PKR 1000 - 2000",
              "medicalSpecialty": [
                "Obstetrics",
                "Gynecology",
                "Laparoscopic Surgery",
                "Reproductive Medicine",
                "Maternal-Fetal Medicine"
              ],
              "knowsAbout": [
                "PCOS Management",
                "High-Risk Pregnancy",
                "Laparoscopic Surgery",
                "Infertility Treatment",
                "Antenatal Care",
                "Normal Delivery",
                "C-Section Delivery",
                "Hysteroscopy",
                "Menopause Care",
                "Fibroid Treatment",
                "Cervical Care",
                "Colposcopy"
              ],
              "hasCredential": [
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "MBBS", "recognizedBy": { "@type": "Organization", "name": "Dow University of Health Sciences" } },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "FCPS (Obstetrics & Gynaecology)", "recognizedBy": { "@type": "Organization", "name": "College of Physicians and Surgeons Pakistan" } }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nazimabad",
                "addressLocality": "Karachi",
                "addressRegion": "Sindh",
                "postalCode": "74600",
                "addressCountry": "PK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.9215,
                "longitude": 67.0601
              },
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Wednesday", "Friday"], "opens": "18:00", "closes": "20:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "13:00", "closes": "15:00" }
              ],
              "sameAs": [
                "https://www.facebook.com/drnishatabassum",
                "https://www.instagram.com/drnishatabassum",
                "https://pk.linkedin.com/in/dr-nisha-tabassum-426941246"
              ],
              "worksFor": [
                { "@type": "Hospital", "name": "Sindh Rangers Hospital", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" } },
                { "@type": "Hospital", "name": "Mamji Hospital", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" } },
                { "@type": "Hospital", "name": "RIMS Trauma Hospital", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" } }
              ],
              "review": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "152",
                "bestRating": "5"
              }
            }),
          }}
        />

        {/* JSON-LD — Local Medical Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Dr. Nisha Tabassum Consultation Clinic",
              "url": "https://www.drnishatabassum.com",
              "telephone": "+923273885120",
              "email": "info@drnishatabassum.com",
              "image": "https://www.drnishatabassum.com/og-image.jpg",
              "description": "Best gynaecologist clinic in Karachi. Dr. Nisha Tabassum offers PCOS treatment, pregnancy care, laparoscopic surgery, infertility consultation, and complete women's healthcare.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nazimabad",
                "addressLocality": "Karachi",
                "addressRegion": "Sindh",
                "addressCountry": "PK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 24.9215,
                "longitude": 67.0601
              },
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Wednesday", "Friday"], "opens": "18:00", "closes": "20:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "13:00", "closes": "15:00" }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "152",
                "bestRating": "5"
              }
            }),
          }}
        />

        {/* JSON-LD — FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who is Dr. Nisha Tabassum?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Dr. Nisha Tabassum is a PMDC-Verified Consultant Gynaecologist and Laparoscopic Surgeon based in Karachi with over 13 years of experience. She holds MBBS and FCPS qualifications and specialises in PCOS, high-risk pregnancy, infertility, and laparoscopic surgery." }
                },
                {
                  "@type": "Question",
                  "name": "Where is Dr. Nisha Tabassum's clinic in Karachi?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Dr. Nisha Tabassum sees patients at Nazimabad Clinic (Mon, Wed, Fri 6–8 PM, Sat 1–3 PM), Sindh Rangers Hospital, Mamji Hospital, and RIMS Trauma Hospital in Karachi." }
                },
                {
                  "@type": "Question",
                  "name": "How to book an appointment with Dr. Nisha Tabassum?",
                  "acceptedAnswer": { "@type": "Answer", "text": "You can book an appointment via WhatsApp at +923273885120, call directly, or fill the appointment form at drnishatabassum.com." }
                },
                {
                  "@type": "Question",
                  "name": "What does Dr. Nisha Tabassum treat?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Dr. Nisha treats PCOS, irregular periods, high-risk pregnancy, infertility, fibroids, endometriosis, menopause, ovarian cysts, and performs laparoscopic surgery and hysteroscopy." }
                },
                {
                  "@type": "Question",
                  "name": "Is Dr. Nisha Tabassum PMDC verified?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, Dr. Nisha Tabassum is a fully PMDC-verified Consultant Gynaecologist and Laparoscopic Surgeon in Pakistan." }
                }
              ]
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
