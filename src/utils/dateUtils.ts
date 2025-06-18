import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import { TimeUnit } from '../types';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'MM/dd');
};

export const formatWeekLabel = (start: Date, end: Date): string => {
  return `${format(start, 'MM.dd')}-${format(end, 'MM.dd')}`;
};

export const formatMonthLabel = (date: Date): string => {
  return format(date, 'yyyy年M月');
};

export const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let current = new Date(startDate);
  
  while (current <= endDate) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }
  
  return dates;
};

export const generateWeekRange = (startDate: Date, endDate: Date): TimeUnit[] => {
  const weeks: TimeUnit[] = [];
  let current = startOfWeek(startDate, { weekStartsOn: 0 });
  
  while (current <= endDate) {
    const weekStart = new Date(current);
    const weekEnd = endOfWeek(current, { weekStartsOn: 0 });
    const actualEnd = weekEnd > endDate ? endDate : weekEnd;
    
    weeks.push({
      start: weekStart,
      end: actualEnd,
      label: formatWeekLabel(weekStart, actualEnd)
    });
    
    current = addWeeks(current, 1);
  }
  
  return weeks;
};

export const generateMonthRange = (startDate: Date, endDate: Date): TimeUnit[] => {
  const months: TimeUnit[] = [];
  let current = startOfMonth(startDate);
  
  while (current <= endDate) {
    const monthStart = new Date(current);
    const monthEnd = endOfMonth(current);
    const actualEnd = monthEnd > endDate ? endDate : monthEnd;
    
    months.push({
      start: monthStart,
      end: actualEnd,
      label: formatMonthLabel(monthStart)
    });
    
    current = addMonths(current, 1);
  }
  
  return months;
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isTodayInRange = (start: Date, end: Date): boolean => {
  const today = new Date();
  return isWithinInterval(today, { start, end });
};

export const getProjectPosition = (
  project: { startDate: string; endDate: string },
  timeUnits: (Date | TimeUnit)[],
  viewMode: string
): { left: number; width: number } => {
  const hasStart = project.startDate;
  const hasEnd = project.endDate;
  
  if (!hasStart && !hasEnd) {
    return { left: 45, width: 10 }; // Centered unplanned bar
  }
  
  const startDate = hasStart ? new Date(project.startDate) : null;
  const endDate = hasEnd ? new Date(project.endDate) : null;
  
  let startIdx = 0;
  let endIdx = timeUnits.length - 1;
  
  if (viewMode === 'day') {
    const dateUnits = timeUnits as Date[];
    if (startDate) {
      startIdx = dateUnits.findIndex(d => isSameDay(d, startDate));
      if (startIdx === -1) startIdx = 0;
    }
    if (endDate) {
      endIdx = dateUnits.findIndex(d => isSameDay(d, endDate));
      if (endIdx === -1) endIdx = dateUnits.length - 1;
    }
  } else {
    const unitRanges = timeUnits as TimeUnit[];
    if (startDate) {
      startIdx = unitRanges.findIndex(unit => 
        isWithinInterval(startDate, { start: unit.start, end: unit.end })
      );
      if (startIdx === -1) startIdx = 0;
    }
    if (endDate) {
      endIdx = unitRanges.findIndex(unit => 
        isWithinInterval(endDate, { start: unit.start, end: unit.end })
      );
      if (endIdx === -1) endIdx = unitRanges.length - 1;
    }
  }
  
  if (endIdx < startIdx) endIdx = startIdx;
  
  const totalUnits = timeUnits.length;
  let left = (startIdx / totalUnits) * 100;
  let width = ((endIdx - startIdx + 1) / totalUnits) * 100;
  
  if (hasStart && !hasEnd) {
    width = 100 - left;
  } else if (!hasStart && hasEnd) {
    left = 0;
    width = ((endIdx + 1) / totalUnits) * 100;
  }
  
  return { left, width };
};