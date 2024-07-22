import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AssetAdvancedFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-advanced-form-builder';
import {AssetDatasourceFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-datasource-form-builder';
import {AssetGeneralFormBuilder} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/asset-general-form-builder';
import {EditAssetForm} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form';
import {EditAssetFormInitializer} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-initializer';
import {EdcApiService} from 'src/app/core/services/api/edc-api.service';
import {AssetRequestBuilder} from 'src/app/core/services/asset-request-builder';

@Component({
  selector: 'asset-edit-page',
  templateUrl: './asset-edit-page.component.html',
  providers: [EditAssetFormInitializer, AssetRequestBuilder],
  viewProviders: [
    EditAssetForm,
    AssetGeneralFormBuilder,
    AssetDatasourceFormBuilder,
    AssetAdvancedFormBuilder,
  ],
})
export class AssetEditPageComponent {
  isLoading = false;

  constructor(
    private editAssetFormInitializer: EditAssetFormInitializer,
    private form: EditAssetForm,
    private assetRequestBuilder: AssetRequestBuilder,
    private edcApiService: EdcApiService,
    private router: Router,
  ) {
    history.state.uiAssetMapped
      ? this.form.reset(
          this.editAssetFormInitializer.forEdit(history.state.uiAssetMapped),
        )
      : this.form.reset(this.editAssetFormInitializer.forCreate());
  }

  onSubmit() {
    this.form.all.disable();

    const formValue = this.form.value;
    const mode = this.form.mode;

    // Workaround around disabled controls not being included in the form value
    if (mode !== 'CREATE') {
      formValue.general!.id = this.form.general.controls.id.getRawValue();
    }

    if (mode === 'CREATE') {
      const createRequest =
        this.assetRequestBuilder.buildAssetCreateRequest(formValue);
      this.edcApiService.createAsset(createRequest);
    }

    if (mode === 'EDIT') {
      const assetId = formValue.general?.id!;
      const editRequest =
        this.assetRequestBuilder.buildAssetEditRequest(formValue);
      this.edcApiService.editAsset(assetId, editRequest);
    }

    this.router.navigate(['my-assets']);
  }
}
