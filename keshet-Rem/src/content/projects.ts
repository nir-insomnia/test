/**
 * פרויקטי תלמידים.
 *
 * איך מוסיפים פרויקט:
 *  1. מעתיקים בלוק שלם (למשל את EcoTrack) לסוף הרשימה.
 *  2. משנים שם, כותרת משנה, תיאור, תגיות.
 *  3. לתמונה: מעלים קובץ לתיקייה public/images/projects/ וכותבים
 *     image: "/images/projects/השם.jpg". בלי תמונה — מוצג איור מוכן.
 *  4. להדגמה חיה: כותבים demoUrl: "https://..." — הכפתור נפתר מאופטימי.
 *
 * tone = צבע הכרטיס: "bg-primary" (ירוק), "bg-amber" (ענבר), "bg-olive" (זית).
 * icon = סמל מתוך lucide-react: Globe2, Bot, ShieldCheck, Sparkles, Cpu, Code2.
 */
import {
  Bot,
  Globe2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Project = {
  title: string;
  subtitle: string;
  /** פסקה קצרה בכרטיס */
  description: string;
  /** פסקה מלאה בחלון הפרטים (אם ריק — מוצג description) */
  details?: string;
  tags: string[];
  tone: "bg-primary" | "bg-amber" | "bg-olive";
  icon: LucideIcon;
  /** נתיב לתמונה, למשל "/images/projects/ecotrack.jpg" */
  image?: string;
  /** קישור להדגמה חיה */
  demoUrl?: string;
  /** שנת הלימודים / שמות התלמידים */
  meta?: string;
};

export const projects: Project[] = [
  {
    title: "EcoTrack",
    subtitle: "מערכת חכמה למעקב סביבתי",
    description:
      "לוח בקרה שמציג נתוני צריכת אנרגיה ומציע דרכים פשוטות לחיסכון בבית הספר.",
    details:
      "EcoTrack נבנה כפרויקט בכיתה י״א. המערכת אוספת נתוני צריכה ממכשירים בבית הספר, מציגה אותם בלוח בקרה, ומציעה המלצות מעשיות לחיסכון. הצוות למד לעבוד עם Git, לחלק משימות ולשלב בין עיבוד נתונים לבין ממשק משתמש.",
    tags: ["React", "Python", "Data"],
    tone: "bg-primary",
    icon: Globe2,
    meta: "כיתה י״א · צוות של ארבעה תלמידים",
  },
  {
    title: "StudyMate AI",
    subtitle: "עוזר למידה אישי",
    description:
      "כלי שמארגן חומר לימוד, מייצר שאלות תרגול ומסייע לתלמידים ללמוד בקצב שלהם.",
    details:
      "StudyMate AI מזהה את הנושאים שבהם התלמיד מתקשה ומייצר שאלות תרגול בהתאם. הפרויקט שילב עבודת ממשק, חשיבה על חוויית משתמש ושימוש במודל שפה ליצירת שאלות.",
    tags: ["AI", "TypeScript", "UX"],
    tone: "bg-amber",
    icon: Bot,
    meta: "כיתה י״ב · פרויקט גמר",
  },
  {
    title: "SafeNet",
    subtitle: "משחק סייבר אינטראקטיבי",
    description:
      "משחק משימות המלמד זיהוי איומים, סיסמאות חזקות והתנהלות בטוחה ברשת.",
    details:
      "SafeNet מלמד סייבר דרך משחק: כל שלב מציג תרחיש אמיתי — הודעת פישינג, סיסמה חלשה, רשת לא מאובטחת — והשחקן צריך להחליט איך לנהוג. הפרויקט נבדק בכיתות של שכבת י׳.",
    tags: ["Cyber", "JavaScript", "Game"],
    tone: "bg-olive",
    icon: ShieldCheck,
    meta: "כיתה י״א · שיתוף עם שכבת י׳",
  },
];
