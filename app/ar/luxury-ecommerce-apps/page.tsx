import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تطوير تطبيقات المتاجر الإلكترونية الفاخرة | Avenore Tech",
  description:
    "نبني تطبيقات المتاجر الإلكترونية (E-Commerce) الفاخرة التي توفر تجربة تسوق سريعة كالسحر وتتحمل مئات الآلاف من الزوار في نفس اللحظة. خبرة في K-NET و Stripe.",
  alternates: {
    canonical: "https://avenore.tech/ar/luxury-ecommerce-apps",
  },
};

const C = {
  surface: "#131317",
  surfaceLow: "#1b1b20",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#d0bcff",
  outline: "#958ea0",
  tertiary: "#5edf81",
};

export default function LuxuryEcommerceAppsAr() {
  return (
    <div
      className="ar-page"
      style={{
        backgroundColor: C.surface,
        color: C.onSurface,
        minHeight: "100vh",
        fontFamily: "var(--font-outfit), var(--font-geist), sans-serif",
      }}
      dir="rtl"
    >
      {/* Hero Section */}
      <section
        style={{
          paddingTop: "40px",
          paddingBottom: "80px",
          borderBottom: `1px solid rgba(149, 142, 160, 0.2)`,
        }}
      >
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                backgroundColor: C.primary,
                color: "#000",
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              التجارة الإلكترونية المتقدمة
            </span>
            <span
              style={{ color: C.outline, fontSize: "14px", fontWeight: 600 }}
            >
              السرعة تزيد من المبيعات
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            تصميم وتطوير تطبيقات{" "}
            <span style={{ color: C.primary }}>المتاجر الإلكترونية</span> عالية
            الضغط
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: C.onSurfaceVariant,
              maxWidth: "650px",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
            }}
          >
            العلامات التجارية الفاخرة لا تستخدم القوالب الجاهزة. في Avenore
            Tech، نهندس تطبيقات التجارة الإلكترونية المخصصة بالكامل (Custom
            Mobile Commerce) لتوفير تجربة مستخدم مبهرة (UI/UX)، وسرعة تحميل لا
            تتجاوز ثانية واحدة، وقدرة على تحمل حملات الإطلاق (Drops) التي تجلب
            آلاف المشترين في نفس الدقيقة دون انهيار التطبيق.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: C.primary,
                color: "#000",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              خطط لإطلاق متجرك الفاخر
            </Link>
            <Link
              href="/work"
              style={{
                backgroundColor: C.surfaceLow,
                color: C.onSurface,
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 600,
                textDecoration: "none",
                border: `1px solid ${C.outline}60`,
                fontSize: "15px",
              }}
            >
              شاهد كيف قمنا بهندسة تطبيق FASH
            </Link>
          </div>
        </div>
      </section>

      {/* E-Commerce Performance Drivers */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <h2
            style={{ fontSize: "32px", fontWeight: 800, marginBottom: "3rem" }}
          >
            هندسة مصممة لرفع معدلات التحويل (Conversion Rates)
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: C.surfaceLow,
                padding: "2.5rem",
                borderRadius: "24px",
                border: `1px solid rgba(149, 142, 160, 0.1)`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: C.surfaceLowest,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: C.primary }}
                >
                  speed
                </span>
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: C.onSurface,
                  marginBottom: "1rem",
                }}
              >
                سرعة استجابة مذهلة (Micro-seconds)
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                كل ثانية تأخير في تحميل المتجر تكلفك خسارة 7% من المبيعات. نعتمد
                على استراتيجيات التخزين المؤقت المتقدمة (Caching) وشبكات توزيع
                المحتوى (Edge CDNs) لضمان تحميل منتجاتك فورياً حتى مع وجود آلاف
                الصور عالية الدقة.
              </p>
            </div>

            <div
              style={{
                backgroundColor: C.surfaceLow,
                padding: "2.5rem",
                borderRadius: "24px",
                border: `1px solid rgba(149, 142, 160, 0.1)`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: C.surfaceLowest,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: C.primary }}
                >
                  shopping_cart_checkout
                </span>
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: C.onSurface,
                  marginBottom: "1rem",
                }}
              >
                دفع سلس بلمسة واحدة (1-Tap Checkout)
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                نقوم بربط التطبيق مع بوابات الدفع (K-NET, Mada, Apple Pay,
                Stripe) وتصميم شاشات دفع (Checkout) خالية من الاحتكاك، لتخفيض
                نسبة التخلي عن سلة المشتريات (Cart Abandonment).
              </p>
            </div>

            <div
              style={{
                backgroundColor: C.surfaceLow,
                padding: "2.5rem",
                borderRadius: "24px",
                border: `1px solid rgba(149, 142, 160, 0.1)`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: C.surfaceLowest,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: C.primary }}
                >
                  cloud_done
                </span>
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: C.onSurface,
                  marginBottom: "1rem",
                }}
              >
                بنية تحتية لحملات الإطلاق (Hype Drops)
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                إذا كانت استراتيجية مبيعاتك تعتمد على الإطلاقات المحدودة
                (Limited Drops) أو حملات المؤثرين التي تجلب موجة هائلة من الزوار
                فجأة، نحن نهندس خوادم تتوسع تلقائياً (Auto-scaling) لمنع انهيار
                متجرك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FASH Case Study */}
      <section
        style={{
          backgroundColor: C.surfaceLowest,
          paddingTop: "80px",
          paddingBottom: "80px",
          borderTop: `1px solid rgba(149, 142, 160, 0.2)`,
        }}
      >
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <div
            style={{ display: "grid", gap: "4rem", alignItems: "center" }}
            className="grid-cols-1 md:grid-cols-2"
          >
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                }}
              >
                المتاجر الفاخرة تتطلب هندسة فاخرة
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                العميل الذي يشتري منتجاً عالي القيمة يتوقع تجربة رقمية تعكس قيمة
                العلامة التجارية. التصميم الجميل لا يكفي إذا كانت استجابة
                الواجهة بطيئة أو عملية الدفع معقدة.
              </p>
              <Link
                href="/contact"
                style={{
                  backgroundColor: "#000",
                  color: C.primary,
                  border: `1px solid ${C.primary}`,
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                ناقش مشروع التجارة الإلكترونية الخاص بك →
              </Link>
            </div>
            <div
              style={{
                backgroundColor: C.surfaceLow,
                padding: "3rem",
                borderRadius: "24px",
                border: `1px solid ${C.tertiary}40`,
              }}
            >
              <span
                style={{
                  color: C.tertiary,
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                حالة دراسية: FASH STUDIO
              </span>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  marginBottom: "1rem",
                }}
              >
                منصة حجز للقطع النادرة والحصرية
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                قمنا بتطوير تطبيق FASH الذي يعتمد على استراتيجية (Curated
                Drops). التطبيق يتيح للمستخدمين حجز القطع الحصرية قبل نفاد
                الكمية (124 قطعة متبقية)، متطلباً نظام جرد لحظي (Real-time
                Inventory) يمنع الحجوزات المزدوجة أثناء الضغط العالي.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: C.onSurface,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <li
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ color: C.tertiary }}>+</span> نظام جرد لحظي
                  يمنع الـ Overselling
                </li>
                <li
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ color: C.tertiary }}>+</span> معمارية تتحمل
                  ذروة الإطلاق (Drop Events)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
