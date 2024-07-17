import {Component, Input} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export interface AssetList {
  filteredAssets: UiAssetMapped[];
  numTotalAssets: number;
}

@Component({
  selector: 'asset-create-page-form-label',
  templateUrl: './asset-create-page-form-label.component.html',
  styleUrls: ['./asset-create-page-form-label.component.scss'],
})
export class AssetCreatePageFormLabelComponent {
  @Input() label!: string;
  @Input() htmlFor!: string;
  @Input() ctrl!: FormControl<any>;

  isRequired(): boolean {
    return this.ctrl.hasValidator(Validators.required);
  }
}
