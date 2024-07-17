import {Component, Input} from '@angular/core';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export interface AssetList {
  filteredAssets: UiAssetMapped[];
  numTotalAssets: number;
}

@Component({
  selector: 'asset-create-page-form-group',
  templateUrl: './asset-create-page-form-group.component.html',
  styleUrls: ['./asset-create-page-form-group.component.scss'],
})
export class AssetCreatePageFormGroupComponent {
  @Input() title!: String;
  @Input() description!: String;
}
