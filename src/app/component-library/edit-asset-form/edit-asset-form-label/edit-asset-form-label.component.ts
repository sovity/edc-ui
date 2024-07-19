import {Component, Input} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'edit-asset-form-label',
  templateUrl: './edit-asset-form-label.component.html',
  styleUrls: ['./edit-asset-form-label.component.scss'],
})
export class EditAssetFormLabelComponent {
  @Input() label!: string;
  @Input() htmlFor?: string;
  @Input() ctrl?: FormControl<any>;
  @Input() allTouched = false;

  isRequired(): boolean {
    return this.ctrl?.hasValidator(Validators.required) || false;
  }
}
