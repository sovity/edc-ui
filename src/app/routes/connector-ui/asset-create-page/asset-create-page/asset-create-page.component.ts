import {Component} from '@angular/core';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';
import {AssetCreateForm} from './form/asset-create-form';
import {AssetCreateFormInitializer} from './form/asset-create-form-initializer';
import {AssetGeneralFormBuilder} from './form/asset-general-form-builder';

export interface AssetList {
  filteredAssets: UiAssetMapped[];
  numTotalAssets: number;
}

@Component({
  selector: 'asset-create-page',
  templateUrl: './asset-create-page.component.html',
  styleUrls: ['./asset-create-page.component.scss'],
  providers: [
    AssetCreateFormInitializer,
    AssetCreateForm,
    AssetGeneralFormBuilder,
  ],
})
export class AssetCreatePageComponent {
  constructor(
    private assetCreateFormInitializer: AssetCreateFormInitializer,
    public form: AssetCreateForm,
  ) {
    this.form.reset(this.assetCreateFormInitializer.forCreate());
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
