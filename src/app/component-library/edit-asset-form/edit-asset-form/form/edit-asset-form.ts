import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataCategorySelectItem} from '../../data-category-select/data-category-select-item';
import {AssetGeneralFormBuilder} from './asset-general-form-builder';
import {
  EditAssetFormModel,
  EditAssetFormValue,
} from './model/edit-asset-form-model';
import {AssetEditDialogMode} from './model/asset-edit-dialog-mode';
import {AssetGeneralFormModel} from './model/asset-general-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class EditAssetForm {
  all!: FormGroup<EditAssetFormModel>;

  general!: EditAssetFormModel['general'];

  get value(): EditAssetFormValue {
    return this.all.value;
  }

  get mode(): AssetEditDialogMode {
    return this.all.controls.mode.value;
  }

  get dataCategory(): DataCategorySelectItem | null {
    return this.general!!.controls.dataCategory.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private assetGeneralFormBuilder: AssetGeneralFormBuilder,
  ) {}

  reset(initial: EditAssetFormValue) {
    this.all = this.buildFormGroup(initial);
    this.general = this.all.controls.general;
  }

  buildFormGroup(
    initial: EditAssetFormValue,
  ): FormGroup<EditAssetFormModel> {
    const general: FormGroup<AssetGeneralFormModel> =
      this.assetGeneralFormBuilder.buildFormGroup(
        initial.general!,
        initial.mode!,
      );

    const formGroup: FormGroup<EditAssetFormModel> =
      this.formBuilder.nonNullable.group({
        mode: [initial.mode as AssetEditDialogMode],
        general,
      });

    return formGroup;
  }
}
