import {formatDistanceToNow} from 'date-fns';
import {DateInput} from "./date-input";

/**
 * Formats date as "{n} {timeUnit} ago" or "in {n} {timeUnit}s".
 * @param date date
 */
export function formatDateAgo(date?: DateInput): string {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return formatDistanceToNow(date, {addSuffix: true});
}
