export function nextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1);
}

export function prevMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1);
}

export function startMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1,  0);
}

export function datesInMonth(date) {
  const numberOfDays = endMonth(date).getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  return Array(numberOfDays).fill().map((_, day) => new Date(year, month, day + 1, 0, 0, 0, 0));
}

export function isSame(date, other, filter='year month day') {
  if (!date || !other) return false;
  return (!filter.includes('year') || date.getFullYear() === other.getFullYear()) &&
    (!filter.includes('month') || date.getMonth() === other.getMonth()) &&
    (!filter.includes('day') || date.getDate() === other.getDate())
}
