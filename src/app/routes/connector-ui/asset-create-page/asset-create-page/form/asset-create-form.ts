import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataCategorySelectItem} from '../../data-category-select/data-category-select-item';
import {AssetGeneralFormBuilder} from './asset-general-form-builder';
import {
  AssetCreateFormModel,
  AssetCreateFormValue,
} from './model/asset-create-form-model';
import {AssetEditDialogMode} from './model/asset-edit-dialog-mode';
import {AssetGeneralFormModel} from './model/asset-general-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class AssetCreateForm {
  all!: FormGroup<AssetCreateFormModel>;

  general!: AssetCreateFormModel['general'];

  get value(): AssetCreateFormValue {
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

  reset(initial: AssetCreateFormValue) {
    this.all = this.buildFormGroup(initial);
    this.general = this.all.controls.general;
  }

  buildFormGroup(
    initial: AssetCreateFormValue,
  ): FormGroup<AssetCreateFormModel> {
    const general: FormGroup<AssetGeneralFormModel> =
      this.assetGeneralFormBuilder.buildFormGroup(
        initial.general!,
        initial.mode!,
      );

    const formGroup: FormGroup<AssetCreateFormModel> =
      this.formBuilder.nonNullable.group({
        mode: [initial.mode as AssetEditDialogMode],
        general,
      });

    return formGroup;
  }
}
