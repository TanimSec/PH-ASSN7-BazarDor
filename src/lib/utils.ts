const BENGALI_DIGITS: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBengaliNumber(val: number | string | undefined | null): string {
  if (val === undefined || val === null) return "০";
  
  // Format number with thousands separator if numeric
  let str: string;
  if (typeof val === "number") {
    // Round to 1 decimal place if floating, or keep integer
    const formatted = val % 1 === 0 ? val.toLocaleString("en-US") : val.toFixed(1);
    str = String(formatted);
  } else {
    str = String(val);
  }

  return str
    .split("")
    .map((char) => BENGALI_DIGITS[char] ?? char)
    .join("");
}

export function formatUnit(unit: string | undefined): string {
  if (!unit) return "প্রতি কেজি";
  const lower = unit.toLowerCase().trim();
  if (lower.includes("কেজি") || lower === "kg") return "প্রতি কেজি";
  if (lower.includes("লিটার") || lower === "liter" || lower === "litre" || lower === "l") return "প্রতি লিটার";
  if (lower.includes("ডজন") || lower === "dozen") return "প্রতি ডজন";
  if (lower.includes("পিস") || lower === "piece" || lower === "pc") return "প্রতি পিস";
  if (lower.includes("গ্রাম") || lower === "gm" || lower === "g") return `প্রতি ${unit}`;
  return `প্রতি ${unit}`;
}

export function getBengaliDate(): string {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const day = toBengaliNumber(now.getDate());
  const month = months[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${day} ${month}, ${year}`;
}
