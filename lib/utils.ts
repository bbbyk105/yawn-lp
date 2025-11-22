import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 日付フォーマット - より堅牢に
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Invalid Dateチェック
    if (isNaN(dateObj.getTime())) {
      return "";
    }

    return dateObj.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}
