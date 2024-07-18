import {Component} from '@angular/core';
import {EditAssetFormInitializer} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-initializer';

@Component({
  selector: 'asset-edit-page',
  templateUrl: './asset-edit-page.component.html',
  providers: [EditAssetFormInitializer],
})
export class AssetEditPageComponent {
  constructor(private editAssetFormInitializer: EditAssetFormInitializer) {}

  get initialFormValue() {
    return this.editAssetFormInitializer.forEdit(history.state.uiAssetMapped);
  }
}
