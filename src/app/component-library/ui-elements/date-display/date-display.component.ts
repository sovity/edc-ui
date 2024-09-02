import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
})
export class DateDisplayComponent implements OnInit {
  @Input() rawDate!: string;
  displayDate!: string;

  ngOnInit(): void {
    this.processDate(this.rawDate);
  }

  processDate(rawDate: string) {
    const date = new Date(rawDate);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );

    // Check if the local time is exactly midnight
    if (localDate.getHours() === 0 && localDate.getMinutes() === 0) {
      // Check if it's NOT January 1st
      if (!(localDate.getDate() === 1 && localDate.getMonth() === 0)) {
        localDate.setDate(localDate.getDate() - 1);
      }
    }

    // Format the date
    this.displayDate = this.formatDate(localDate);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
