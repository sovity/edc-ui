import {Component, Input} from '@angular/core';

@Component({
  selector: 'edit-asset-form-group',
  templateUrl: './edit-asset-form-group.component.html',
  styleUrls: ['./edit-asset-form-group.component.scss'],
})
export class EditAssetFormGroupComponent {
  @Input() title!: String;
  @Input() description!: String;
}
