import { timeFormat } from 'd3';

const formatDate = (date, style, isUTC = false) => {
  // this prevents errors when date is undefined
  if (!date) {
    console.log('No date provided');
    console.log('date:', date);
    return '';
  }
  const dateObj = new Date(date);
  const timezone = isUTC ? 'UTC' : Intl.DateTimeFormat().resolvedOptions().timeZone;

  switch (style) {
    // Tue, Apr 18, 2023
    case 'monitorTimeCardDate':
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: timezone,
      }).format(dateObj);
    // 16:30 MDT
    case 'monitorTimeCardTime':
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZoneName: 'short',
        timeZone: timezone,
      }).format(dateObj);
    // Tue, Jan 10, 2023
    case 'weekdayMonthYear':
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: timezone,
      }).format(dateObj);
    // Jan 10, 2023
    case 'dayMonthYear':
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: timezone,
      }).format(dateObj);
    // 01/10
    case 'numericDayMonth':
      return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        timeZone: timezone,
      }).format(dateObj);
    // 1:53 AM MST
    case 'timeWithZone':
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
        timeZoneName: 'short',
        timeZone: timezone,
      }).format(dateObj);
    // 1:53 AM
    case 'timeNoZone':
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
        timeZone: timezone,
      }).format(dateObj);
    // PST
    case 'timezone': {
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'short',
        timeZone: timezone,
      }).format(dateObj);
      return formatted.slice(-3);
    }
    case 'controlsSlider':
      return [timeFormat('%-I %p')(dateObj), timeFormat('%-m/%-d')(dateObj)];
    default:
      return '';
  }
};

export default formatDate;