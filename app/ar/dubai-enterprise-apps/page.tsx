import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "شركة تطوير تطبيقات المؤسسات والشركات في دبي | Avenore Tech",
  description: "خبراء هندسة تطبيقات المؤسسات والأنظمة الحكومية في دبي والإمارات. نوفر ربط آمن مع الهوية الرقمية (UAE Pass) وبنية تحتية سحابية متوافقة مع معايير الأمان.",
  alternates: {
    canonical: "https://avenore.tech/ar/dubai-enterprise-apps",
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

export default function DubaiEnterpriseAppsAr() {
  return (
    <div className="ar-page" style={{ backgroundColor: C.surface, color: C.onSurface, minHeight: "100vh", fontFamily: "var(--font-outfit), var(--font-geist), sans-serif" }} dir="rtl">
      
      {/* Hero Section */}
      <section style={{ paddingTop: "40px", paddingBottom: "80px", borderBottom: `1px solid rgba(149, 142, 160, 0.2)` }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "1.5rem" }}>
             <span style={{ backgroundColor: C.tertiary, color: "#000", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: "bold" }}>تطبيقات المؤسسات والأنظمة الحكومية</span>
             <span style={{ color: C.outline, fontSize: "14px", fontWeight: 600 }}>أمان، توسع، وامتثال كامل</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            بناء الأنظمة وتطبيقات المؤسسات الكبرى في <span style={{ color: C.primary }}>دبي والإمارات</span>
          </h1>
          <p style={{ fontSize: "18px", color: C.onSurfaceVariant, maxWidth: "650px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            في أسواق ديناميكية مثل دبي، لا تكفي التطبيقات التقليدية. نحن في Avenore Tech نتشارك مع المؤسسات والجهات الحكومية لبناء أنظمة داخلية شديدة الأمان (Enterprise Apps)، وتطبيقات B2B متكاملة تعتمد على بنية سحابية مقاومة للأخطاء (Zero-Trust Architecture).
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ backgroundColor: C.primary, color: "#000", padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
              حدد موعداً استشارياً
            </Link>
            <Link href="/work" style={{ backgroundColor: C.surfaceLow, color: C.onSurface, padding: "14px 28px", borderRadius: "9999px", fontWeight: 600, textDecoration: "none", border: `1px solid ${C.outline}60`, fontSize: "15px" }}>
              تصفح حالة دراسية: MCC Dubai
            </Link>
          </div>
        </div>
      </section>

      {/* UAE Enterprise Requirements */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "3rem" }}>هندسة تتوافق مع المعايير الرقمية لدولة الإمارات</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem" }}>
            
            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>fingerprint</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>التكامل مع الهوية الرقمية (UAE Pass)</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                توفير تسجيل دخول موحد وآمن لعملائك أو موظفيك من خلال الربط البرمجي المباشر مع واجهات الهوية الرقمية (UAE Pass)، مما يرفع موثوقية التطبيق ويسرّع عمليات التحقق (KYC).
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>corporate_fare</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>أنظمة B2B وإدارة الموارد الميدانية</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                نستبدل العمليات الورقية والإكسيل بتطبيقات جوال مخصصة للمؤسسات، مع دعم وضع عدم الاتصال (Offline-First) للموظفين في الميدان وتزامن فوري عند عودة الاتصال.
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>security</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>أمن البيانات وسيادة المعلومات</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                ندرك أهمية تخزين البيانات داخل الدولة للقطاعات الحساسة. نبني هياكل سحابية مخصصة على موفرين محليين أو AWS/Azure بضوابط وصول صارمة (RBAC) ومصادقة متعددة العوامل (MFA).
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* MCC Dubai Case Study */}
      <section style={{ backgroundColor: C.surfaceLowest, paddingTop: "80px", paddingBottom: "80px", borderTop: `1px solid rgba(149, 142, 160, 0.2)` }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gap: "4rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
            <div style={{ backgroundColor: C.surfaceLow, padding: "3rem", borderRadius: "24px", border: `1px solid ${C.tertiary}40` }}>
              <span style={{ color: C.tertiary, fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "1rem", display: "block" }}>حالة دراسية: MCC DUBAI</span>
              <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "1rem" }}>منصة تفتيش وامتثال ميداني ذكية</h3>
              <p style={{ fontSize: "15px", color: C.onSurfaceVariant, lineHeight: 1.6, marginBottom: "2rem" }}>
                قمنا بتطوير منصة تفتيش ميدانية تابعة لـ MCC Dubai تتطلب مستوى عالياً من المصادقة (Hardware Tokens) وقدرة على المزامنة اللحظية لمعالجة تقارير الامتثال في 14 قطاعاً حيوياً داخل الإمارة.
              </p>
              <ul style={{ listStyle: "none", padding: 0, color: C.onSurface, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: C.tertiary }}>+</span> نظام مصادقة صلب (Hardware Token)</li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: C.tertiary }}>+</span> لوحات تحكم ومراقبة حية للمؤسسة</li>
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "1.5rem" }}>هل تطبيق شركتك جاهز لمستوى Enterprise؟</h2>
              <p style={{ fontSize: "16px", color: C.onSurfaceVariant, lineHeight: 1.6, marginBottom: "2rem" }}>
                تطوير تطبيقات الأفراد (B2C) يختلف جذرياً عن هندسة تطبيقات الشركات (B2B). التطبيقات المؤسسية تتطلب هندسة عكسية للمخاطر وتخطيطاً معمارياً دقيقاً قبل كتابة أي سطر برمجي.
              </p>
              <Link href="/contact" style={{ backgroundColor: "#000", color: C.primary, border: `1px solid ${C.primary}`, padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                ابدأ رحلة التحول الرقمي →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
