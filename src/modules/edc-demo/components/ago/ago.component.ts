import {Component, Input} from '@angular/core';

@Component({
  selector: 'edc-demo-ago',
  template: `<span [title]="date | date : 'EEEE yyyy-MM-dd hh:mm'">{{
    date | ago | async
  }}</span>`,
})
export class AgoComponent {
  @Input()
  date?: Date | null;
}
