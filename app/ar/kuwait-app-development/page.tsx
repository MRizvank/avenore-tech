import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "شركة برمجة وتطوير تطبيقات الجوال في الكويت | Avenore Tech",
  description: "نحن استوديو هندسة برمجيات متخصص في بناء تطبيقات الجوال (Flutter, iOS, Android) ومنتجات المؤسسات في الكويت ومنطقة الخليج. تواصل معنا لتطوير مشروعك.",
  alternates: {
    canonical: "https://avenore.tech/ar/kuwait-app-development",
  }
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

export default function KuwaitAppDevelopmentAr() {
  return (
    <div style={{ backgroundColor: C.surface, color: C.onSurface, minHeight: "100vh", fontFamily: "var(--font-outfit), var(--font-geist), sans-serif" }} dir="rtl">
      
      {/* Hero Section */}
      <section style={{ paddingTop: "40px", paddingBottom: "80px", borderBottom: `1px solid rgba(149, 142, 160, 0.2)` }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "1.5rem" }}>
             <span style={{ backgroundColor: C.tertiary, color: "#000", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: "bold" }}>الأولى في الخليج</span>
             <span style={{ color: C.outline, fontSize: "14px", fontWeight: 600 }}>هندسة تطبيقات الجوال المتقدمة</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            شركة برمجة وتطوير تطبيقات الجوال في <span style={{ color: C.primary }}>الكويت</span>
          </h1>
          <p style={{ fontSize: "18px", color: C.onSurfaceVariant, maxWidth: "600px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            في Avenore Tech، لا نقوم فقط بـ "برمجة التطبيقات". نحن نهندس حلولاً برمجية معمارية قوية للشركات الناشئة والمؤسسات في الكويت ودول الخليج. نعتمد على إطارات عمل حديثة مثل Flutter وبنى تحتية سحابية متوافقة مع متطلبات البنك المركزي.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ backgroundColor: C.primary, color: "#000", padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
              ابدأ مشروعك معنا
            </Link>
            <Link href="/work" style={{ backgroundColor: C.surfaceLow, color: C.onSurface, padding: "14px 28px", borderRadius: "9999px", fontWeight: 600, textDecoration: "none", border: `1px solid ${C.outline}60`, fontSize: "15px" }}>
              استعرض سابقة أعمالنا
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "3rem" }}>لماذا تختار Avenore Tech لتطوير تطبيقك في الكويت؟</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            
            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>smartphone</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>برمجة تطبيقات فلاتر (Flutter)</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                نقدم خدمات تطوير تطبيقات الهواتف الذكية (iOS & Android) باستخدام كود برمجي واحد، مما يضمن أداءً فائقاً بسرعة 120 إطاراً في الثانية وتجربة مستخدم سلسة تنافس التطبيقات العالمية.
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>credit_card</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>بوابات الدفع وحلول K-NET</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                نقوم بربط التطبيقات ببوابات الدفع المحلية مثل كي-نت (K-NET) في الكويت والبطاقات الائتمانية بأمان تام عبر معايير تشفير متقدمة، لضمان تجربة شراء موثوقة للعملاء.
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>dns</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>بنية تحتية سحابية للمؤسسات</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                لا يقتصر عملنا على الواجهة الأمامية. نحن نهندس قواعد بيانات خلفية (Backend) موزعة ومستقرة تتحمل التدفق العالي للمستخدمين وتضمن عدم انهيار تطبيقك أوقات الذروة.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* Proof / Trust Section */}
      <section style={{ backgroundColor: C.primary, color: "#000", paddingTop: "60px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "1rem" }}>موثوقون من قبل نخبة المؤسسات في الخليج</h2>
          <p style={{ fontSize: "16px", fontWeight: 600, maxWidth: "600px", margin: "0 auto", opacity: 0.8 }}>
            قمنا بتسليم مشاريع برمجية متقدمة لأسماء بارزة في قطاع التقنية المالي والمؤسسات الحكومية، مع الحفاظ على أعلى معايير الجودة والأمان.
          </p>
        </div>
      </section>

    </div>
  );
}
