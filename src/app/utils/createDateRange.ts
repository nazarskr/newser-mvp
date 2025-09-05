export interface DateRange {
  start: Date;
  end: Date;
}

export function createDateRange(range: DateRange): DateRange {
  const startDate = new Date(range.start);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(range.end);
  endDate.setHours(23, 59, 59, 999);

  return {
    start: startDate,
    end: endDate
  }
}
