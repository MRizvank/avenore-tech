import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تطوير تطبيقات التقنية المالية (Fintech) في السعودية | Avenore Tech",
  description:
    "نبني تطبيقات مالية وبوابات دفع آمنة تتوافق مع متطلبات البنك المركزي السعودي (SAMA). خبراء في تطوير وتشفير تطبيقات Fintech للشركات الناشئة في الرياض وجدة.",
  alternates: {
    canonical: "https://avenore.tech/ar/saudi-fintech-development",
  },
};

const C = {
  surface: "#131317",
  surfaceLow: "#1b1b20",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  outline: "#958ea0",
  tertiary: "#5edf81",
  error: "#ffb4ab", // Used for security alerts/highlights
};

export default function SaudiFintechDevelopmentAr() {
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
                backgroundColor: C.tertiary,
                color: "#000",
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              حلول التقنية المالية
            </span>
            <span
              style={{ color: C.outline, fontSize: "14px", fontWeight: 600 }}
            >
              متوافقة مع متطلبات (SAMA)
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
            بناء وتطوير تطبيقات{" "}
            <span style={{ color: C.primary }}>التقنية المالية (Fintech)</span>{" "}
            في السعودية
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
            لا مجال للخطأ عندما يتعلق الأمر بأموال المستخدمين. في Avenore Tech،
            نهندس البنية التحتية لتطبيقات المحافظ الإلكترونية (e-Wallets) وحلول
            التمويل الجماعي وبوابات الدفع بتشفير بنكي من الدرجة الأولى يتوافق مع
            اللوائح التنظيمية في المملكة العربية السعودية.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                backgroundColor: C.primary,
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              استشر مهندس أمن معلومات
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
              حالة دراسية: مشروع Sequifi
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Compliance Proposition */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <h2
            style={{ fontSize: "32px", fontWeight: 800, marginBottom: "3rem" }}
          >
            هندسة مالية مصممة للشركات الناشئة في السوق السعودي
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
                  policy
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
                الامتثال التنظيمي (SAMA Compliance)
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                نحن ندرك الصرامة التنظيمية للبنك المركزي السعودي (SAMA). نصمم
                بنية قواعد البيانات السحابية لضمان تخزين بيانات المستخدمين
                الحساسة داخل النطاق الجغرافي للمملكة، وتطبيق معايير مكافحة غسيل
                الأموال (AML) ومبدأ أعرف عميلك (KYC).
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
                  lock
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
                تشفير عسكري النطاق (AES-256)
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                حماية شاملة من نقطة إلى نقطة (E2EE). كل معاملة مالية تمر عبر
                التطبيق يتم تشفيرها باستخدام بروتوكولات الأمان القياسية
                (PCI-DSS)، مع منع هجمات حقن قواعد البيانات والتلاعب بالطلبات
                الجانبية.
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
                  sync_alt
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
                ربط أنظمة الدفع وبوابات الـ API
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  fontSize: "15px",
                }}
              >
                خبرة عميقة في التكامل المباشر مع بوابات الدفع السعودية والخليجية
                الموثوقة (مثل مدى Mada، STC Pay، و Tap Payments) لضمان تسويات
                مالية فورية وبدون أي أعطال للعميل النهائي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Feature / Proof */}
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
                حالة دراسية: SEQUIFI
              </span>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  marginBottom: "1rem",
                }}
              >
                معالجة دقيقة للعمليات المالية المعقدة
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                قامت Avenore Tech ببناء المنصة الأساسية لشركة Sequifi، والتي
                تعتمد على محركات قواعد حسابية معقدة جداً لحساب العمولات وتوزيعها
                بشكل آلي ودقيق. أثبتنا قدرتنا على بناء منطق مالي (Financial
                Logic) لا يقبل الخطأ الصفري.
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
                  <span style={{ color: C.tertiary }}>+</span> معالجة حزم دفعات
                  ضخمة (Payout Batches)
                </li>
                <li
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ color: C.tertiary }}>+</span> تزامن مباشر
                  لبيانات البنوك
                </li>
              </ul>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                }}
              >
                مخاطر اختراق البيانات ليست خياراً
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: C.onSurfaceVariant,
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                المستثمرون (VCs) في السعودية لا يدعمون شركات التقنية المالية ذات
                البنى التحتية الهشة. إطلاق منتجك الأول (MVP) يجب أن يعتمد على
                كود قابل للتدقيق الأمني (Security Audit) واختبارات الاختراق
                (Penetration Testing).
              </p>
              <Link
                href="/contact"
                style={{
                  backgroundColor: "#000",
                  color: "#ffffff",
                  border: `1px solid ${C.primary}`,
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                ناقش بنية تطبيقك مع خبير تقني →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
