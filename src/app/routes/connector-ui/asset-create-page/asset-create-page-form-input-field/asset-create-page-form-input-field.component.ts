import {Component, HostBinding, Input} from '@angular/core';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export interface AssetList {
  filteredAssets: UiAssetMapped[];
  numTotalAssets: number;
}

@Component({
  selector: 'asset-create-page-form-input-field',
  templateUrl: './asset-create-page-form-input-field.component.html',
  styleUrls: ['./asset-create-page-form-input-field.component.scss'],
})
export class AssetCreatePageFormInputFieldComponent {
  @HostBinding('class.col-span-full') cls = true;
  @Input() label!: string;
}
