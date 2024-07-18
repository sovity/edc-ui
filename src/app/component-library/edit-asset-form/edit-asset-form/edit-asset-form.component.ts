import {Component} from '@angular/core';
import {AssetCreateForm} from './form/asset-create-form';
import {AssetCreateFormInitializer} from './form/asset-create-form-initializer';
import {AssetGeneralFormBuilder} from './form/asset-general-form-builder';

@Component({
  selector: 'edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.scss'],
  providers: [
    AssetCreateFormInitializer,
    AssetCreateForm,
    AssetGeneralFormBuilder,
  ],
})
export class EditAssetFormComponent {
  loading = false;

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
