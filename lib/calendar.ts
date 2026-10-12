export interface CalendarDay {
  /** Day of month (1–31). */
  day: number;
  /** ISO date YYYY-MM-DD for the cell’s actual calendar day. */
  isoDate: string;
  /** True when the cell belongs to the displayed month. */
  inMonth: boolean;
}

export interface CalendarMonth {
  year: number;
  /** 0-indexed month (0 = January). */
  month: number;
  label: string;
  days: CalendarDay[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Parse YYYY-MM-DD as a local calendar date (no UTC shift). */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isDateInRange(
  isoDate: string,
  startIso: string,
  endIso: string
): boolean {
  return isoDate >= startIso && isoDate <= endIso;
}

/**
 * Sunday-first grid for a month. Leading cells are empty placeholders;
 * trailing cells may include the start of the next month (Figma style).
 */
export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay(); // 0 = Sunday

  const cells: CalendarDay[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: 0, isoDate: "", inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      isoDate: toIsoDate(new Date(year, month, day)),
      inMonth: true,
    });
  }

  const remainder = cells.length % 7;
  if (remainder !== 0) {
    const trailing = 7 - remainder;
    for (let day = 1; day <= trailing; day++) {
      cells.push({
        day,
        isoDate: toIsoDate(new Date(year, month + 1, day)),
        inMonth: false,
      });
    }
  }

  return cells;
}

const WEEKDAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"] as const;

export function eachIsoDateInRange(
  startIso: string,
  endIso: string
): string[] {
  const dates: string[] = [];
  const cursor = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);

  while (cursor <= end) {
    dates.push(toIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export function formatDayTitle(isoDate: string): string {
  const date = parseIsoDate(isoDate);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
}

/** e.g. "April 5, 2026 - April 12, 2026" */
export function formatTripDateRange(startIso: string, endIso: string): string {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} - ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

export function weekdayLetter(isoDate: string): string {
  return WEEKDAY_LETTERS[parseIsoDate(isoDate).getDay()];
}

export function monthsForTrip(
  startIso: string,
  endIso: string
): CalendarMonth[] {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);

  let year = start.getFullYear();
  let month = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  const months: CalendarMonth[] = [];

  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push({
      year,
      month,
      label: MONTH_NAMES[month],
      days: buildMonthGrid(year, month),
    });

    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  // Match Figma: when the trip fits in one month, also show the next month.
  if (months.length === 1) {
    let nextYear = months[0].year;
    let nextMonth = months[0].month + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    months.push({
      year: nextYear,
      month: nextMonth,
      label: MONTH_NAMES[nextMonth],
      days: buildMonthGrid(nextYear, nextMonth),
    });
  }

  return months;
}
