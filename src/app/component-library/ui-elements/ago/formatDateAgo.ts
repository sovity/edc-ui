/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {formatDistanceToNow} from 'date-fns';
import {de, enUS} from 'date-fns/locale';
import {DateInput} from './date-input';

/**
 * Formats date as "{n} {timeUnit} ago" or "in {n} {timeUnit}s".
 * @param date date
 */
export function formatDateAgo(
  date?: DateInput | null,
  locale?: string,
): string {
  if (!date) {
    return 'never';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const localeDateNfs = locale === 'de' ? de : enUS;
  return formatDistanceToNow(date, {addSuffix: true, locale: localeDateNfs});
}
