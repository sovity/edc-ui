import {Component} from '@angular/core';
import {AssetAdvancedFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-advanced-form-builder';
import {AssetDatasourceFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-datasource-form-builder';
import {AssetGeneralFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-general-form-builder';
import {EditAssetForm} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form';
import {EditAssetFormInitializer} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-initializer';

@Component({
  selector: 'asset-edit-page',
  templateUrl: './asset-edit-page.component.html',
  providers: [EditAssetFormInitializer],
  viewProviders: [
    EditAssetForm,
    AssetGeneralFormBuilder,
    AssetDatasourceFormBuilder,
    AssetAdvancedFormBuilder,
  ],
})
export class AssetEditPageComponent {
  constructor(
    private editAssetFormInitializer: EditAssetFormInitializer,
    private form: EditAssetForm,
  ) {
    this.form.reset(
      this.editAssetFormInitializer.forEdit(history.state.uiAssetMapped),
    );
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
