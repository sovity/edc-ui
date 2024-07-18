import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EditAssetFormInitializer} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-initializer';

@Component({
  selector: 'asset-create-page',
  templateUrl: './asset-create-page.component.html',
  providers: [EditAssetFormInitializer],
})
export class AssetCreatePageComponent {
  constructor(
    private editAssetFormInitializer: EditAssetFormInitializer,
    private router: Router,
  ) {}

  get initialFormValue() {
    return this.editAssetFormInitializer.forCreate();
  }

  edit() {
    this.router.navigate(['my-assets', 'edit'], {state: {abc: 123}});
  }
}
