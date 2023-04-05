import {Component, Input} from '@angular/core';
import {PropertyGridFieldGroup} from './property-grid-field-group';

@Component({
  selector: 'edc-demo-property-grid-field-group',
  templateUrl: './property-grid-field-group.component.html',
})
export class PropertyGridFieldGroupComponent {
  @Input()
  propGroup: PropertyGridFieldGroup = {};

  @Input()
  columns: number = 3;
}
