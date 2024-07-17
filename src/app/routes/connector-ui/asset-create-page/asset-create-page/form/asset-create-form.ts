import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataCategorySelectItem} from '../../data-category-select/data-category-select-item';
import {AssetGeneralFormBuilder} from './asset-general-form-builder';
import {
  AssetCreateFormModel,
  AssetCreateFormValue,
} from './model/asset-create-form-model';
import {AssetGeneralFormModel} from './model/asset-general-form-model';

/**
 * Handles AngularForms for Asset Create Form
 */
@Injectable()
export class AssetCreateForm {
  all!: FormGroup<AssetCreateFormModel>;

  general!: AssetCreateFormModel['general'];

  get value(): AssetCreateFormValue {
    return this.all.value;
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
      this.assetGeneralFormBuilder.buildFormGroup(initial.general!);

    const formGroup: FormGroup<AssetCreateFormModel> =
      this.formBuilder.nonNullable.group({
        general,
      });

    return formGroup;
  }
}
