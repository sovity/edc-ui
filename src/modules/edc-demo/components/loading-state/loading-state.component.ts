import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'edc-demo-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.scss'],
})
export class LoadingStateComponent {
  @HostBinding('class.flex')
  @HostBinding('class.flex-col')
  @HostBinding('class.justify-center')
  @HostBinding('class.items-center')
  @HostBinding('class.min-h-[35rem]')
  cls = true;
}
