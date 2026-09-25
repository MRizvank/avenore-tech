import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "أفضل شركة برمجة تطبيقات فلاتر (Flutter) في الخليج | Avenore Tech",
  description: "خبراء تطوير تطبيقات Flutter في الكويت ودول الخليج. نهندس تطبيقات iOS و Android من كود برمجي واحد بأداء مذهل (120 FPS) للشركات الناشئة والمؤسسات.",
  alternates: {
    canonical: "https://avenore.tech/ar/flutter-agency-gcc",
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

export default function FlutterAgencyGccAr() {
  return (
    <div style={{ backgroundColor: C.surface, color: C.onSurface, minHeight: "100vh", fontFamily: "var(--font-outfit), var(--font-geist), sans-serif" }} dir="rtl">
      
      {/* Hero Section */}
      <section style={{ paddingTop: "40px", paddingBottom: "80px", borderBottom: `1px solid rgba(149, 142, 160, 0.2)` }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "1.5rem" }}>
             <span style={{ backgroundColor: C.primary, color: "#000", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: "bold" }}>خبراء FLUTTER</span>
             <span style={{ color: C.outline, fontSize: "14px", fontWeight: 600 }}>أداء أصلي بتكلفة ذكية</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            شركة تطوير تطبيقات <span style={{ color: C.primary }}>فلاتر (Flutter)</span> في منطقة الخليج
          </h1>
          <p style={{ fontSize: "18px", color: C.onSurfaceVariant, maxWidth: "650px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            تجاوز مشاكل التطبيقات الهجينة البطيئة ومصاريف صيانة كودين منفصلين. في Avenore Tech، نهندس قواعد بيانات Flutter متينة تُنتج تطبيقات iOS و Android أصلية بفيزياء حركة تصل إلى 120 إطاراً في الثانية. مصممة لتتوسع مع نمو شركتك.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ backgroundColor: C.primary, color: "#000", padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
              تحدث مع مهندس فلاتر
            </Link>
            <Link href="/work" style={{ backgroundColor: C.surfaceLow, color: C.onSurface, padding: "14px 28px", borderRadius: "9999px", fontWeight: 600, textDecoration: "none", border: `1px solid ${C.outline}60`, fontSize: "15px" }}>
              استعرض تطبيقات فلاتر التي أطلقناها
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Value Proposition */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "3rem" }}>لماذا تتبنى الشركات الكبرى تقنية Flutter معنا؟</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            
            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>bolt</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>أداء لا يُضاهى (120 FPS)</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                نستفيد من محرك رسومات Impeller الجديد لتقديم رسوم متحركة سلسة واستجابة فورية للواجهات، مما يجعل التطبيق يبدو ويتصرف تماماً كالتطبيقات المبنية بلغات Apple و Google الأصلية.
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>code_blocks</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>هيكلية برمجية نظيفة (Clean Architecture)</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                نرفض الأكواد المتشابكة. نستخدم أحدث أساليب إدارة الحالة (مثل Riverpod) لضمان أن الكود البرمجي قابل للاختبار، الصيانة، وإضافة ميزات جديدة دون المخاطرة بانهيار التطبيق.
              </p>
            </div>

            <div style={{ backgroundColor: C.surfaceLow, padding: "2.5rem", borderRadius: "24px", border: `1px solid rgba(149, 142, 160, 0.1)` }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: C.surfaceLowest, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary }}>rocket_launch</span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: C.onSurface, marginBottom: "1rem" }}>إطلاق أسرع بمرتين</h3>
              <p style={{ color: C.onSurfaceVariant, lineHeight: 1.6, fontSize: "15px" }}>
                بدلاً من توظيف فريقي برمجة (iOS و Android) وتنسيق الإطلاقات بينهما، تسمح لك تقنية فلاتر بإصدار الميزات الجديدة للمنصتين في نفس اللحظة عبر خطوط تكامل مستمرة (CI/CD) مؤتمتة بالكامل.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* Target Audience / Use Cases */}
      <section style={{ backgroundColor: C.surfaceLowest, paddingTop: "80px", paddingBottom: "80px", borderTop: `1px solid rgba(149, 142, 160, 0.2)` }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="md:grid-cols-2 grid-cols-1">
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "1.5rem" }}>استبدل ديونك التقنية بمنصة صلبة</h2>
              <p style={{ fontSize: "16px", color: C.onSurfaceVariant, lineHeight: 1.6, marginBottom: "1.5rem" }}>
                تأتینا الكثیر من الشركات بعد معاناة مع تطبيقات مبنية بتقنيات قديمة أو عبر وكالات خارجية غير احترافية. نحن متخصصون في عمليات "إعادة الهندسة" ونقل الأنظمة المعقدة إلى Flutter بشكل آمن.
              </p>
              <ul style={{ listStyle: "none", padding: 0, color: C.onSurfaceVariant, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "20px" }}>check_circle</span> تطبيقات المتاجر الإلكترونية عالية الضغط</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "20px" }}>check_circle</span> أنظمة إدارة المبيعات وتتبع الموظفين ميدانياً</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "20px" }}>check_circle</span> بوابات التقنية المالية والخدمات المصرفية</li>
              </ul>
            </div>
            <div style={{ backgroundColor: C.primary, color: "#000", padding: "3rem", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "1rem" }}>هل تطبيقك الحالي يعاني من كثرة الأعطال؟</h3>
              <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "2rem", opacity: 0.9 }}>
                لا تدع تجربة المستخدم السيئة تدمر علامتك التجارية. احجز مكالمة اكتشاف مدتها 15 دقيقة مع كبير مهندسينا لتقييم بنيتك التحتية الحالية.
              </p>
              <Link href="/contact" style={{ backgroundColor: "#000", color: C.primary, padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, textDecoration: "none", textAlign: "center", display: "inline-block" }}>
                احجز مراجعة معمارية الآن →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
