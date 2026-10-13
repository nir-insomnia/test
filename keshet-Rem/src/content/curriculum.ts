/**
 * תוכנית הלימודים לפי כיתות.
 *
 * איך עורכים:
 *  - לשינוי טקסט: משנים את השורה ומשמרים.
 *  - להוספת נושא: מוסיפים מילה לרשימת subjects.
 *  - להוספת כיתה: מעתיקים בלוק שלם (למשל את תשעה) ומשנים את התוכן.
 *    הסדר באתר הוא לפי סדר הבלוקים כאן.
 */

export type GradePlan = {
  /** התווית בכפתור, למשל "כיתה ט׳" */
  grade: string;
  /** כותרת הכיתה */
  title: string;
  /** פסקת הסבר קצרה */
  description: string;
  /** רשימת הנושאים */
  subjects: string[];
  /** שורות "קוד" קטנות שמופיעות בצד — קישוט, אפשר לשנות */
  code: string[];
};

export const curriculum = {
  ten: {
    grade: "כיתה י׳",
    title: "מתחילים לחשוב כמו מתכנתים",
    description:
      "בונים בסיס חזק בתכנות, פתרון בעיות וחשיבה אלגוריתמית — דרך תרגול ויצירה.",
    subjects: ["יסודות התכנות", "מבני בקרה", "אלגוריתמים", "פרויקט אישי ראשון"],
    code: ["function start(idea) {", "  return idea.build();", "}"],
  },
  eleven: {
    grade: "כיתה י״א",
    title: "הופכים רעיון למערכת עובדת",
    description:
      "מעמיקים במבני נתונים, תכנות מונחה עצמים ופיתוח Web תוך עבודה בצוות.",
    subjects: [
      "מבני נתונים",
      "תכנות מונחה עצמים",
      "פיתוח Web",
      "עבודת צוות ו-Git",
    ],
    code: ["class StudentProject {", "  build() { return impact; }", "}"],
  },
  twelve: {
    grade: "כיתה י״ב",
    title: "מפתחים טכנולוגיה עם השפעה",
    description:
      "מחברים בין סייבר, בינה מלאכותית ופרויקט גמר משמעותי לקראת הבגרות והעתיד.",
    subjects: [
      "סייבר ואבטחת מידע",
      "מבוא לבינה מלאכותית",
      "פרויקט גמר",
      "הכנה לבגרות",
    ],
    code: [
      "const future = await create({",
      "  curiosity: true,",
      "  courage: true",
      "});",
    ],
  },
} satisfies Record<string, GradePlan>;

/** יחידות הבגרות שמוצגות בכיתה */
export const matriculationUnits = ["5 יח״ל", "10 יח״ל"];
