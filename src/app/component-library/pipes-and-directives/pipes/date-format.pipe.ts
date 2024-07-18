import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

/**
 * Creates Compare By Function for Angular Material compareWith parameters
 */
@Pipe({name: 'formatDate'})
export class DateFormatPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}
  transform(date: Date, format: string): string {
    return formatDate(date, format, this.locale);
  }
}
