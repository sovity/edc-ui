import {Component, HostBinding, Input} from '@angular/core';
import {PropertyGridFieldGroup} from '../property-grid-field-group/property-grid-field-group';

@Component({
  selector: 'edc-demo-property-grid',
  templateUrl: './property-grid.component.html',
})
export class PropertyGrid {
  @Input()
  propGroups: PropertyGridFieldGroup[] = [];

  @Input()
  columns: number = 3;

  @HostBinding('class.flex')
  @HostBinding('class.flex-row')
  @HostBinding('class.flex-wrap')
  @HostBinding('class.gap-[10px]')
  @HostBinding('class.justify-start')
  cls = true;
}
