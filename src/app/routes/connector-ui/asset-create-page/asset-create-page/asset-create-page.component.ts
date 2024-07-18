import {Component} from '@angular/core';
import {AssetDatasourceFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-datasource-form-builder';
import {AssetGeneralFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-general-form-builder';
import {EditAssetForm} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form';
import {EditAssetFormInitializer} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-initializer';

@Component({
  selector: 'asset-create-page',
  templateUrl: './asset-create-page.component.html',
  providers: [EditAssetFormInitializer],
  viewProviders: [
    EditAssetForm,
    AssetGeneralFormBuilder,
    AssetDatasourceFormBuilder,
  ],
})
export class AssetCreatePageComponent {
  constructor(
    private editAssetFormInitializer: EditAssetFormInitializer,
    private form: EditAssetForm,
  ) {
    this.form.reset(this.editAssetFormInitializer.forCreate());
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
