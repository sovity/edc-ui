import {FormControl, FormGroup, ɵFormGroupValue} from '@angular/forms';
import {AssetEditDialogMode} from './asset-edit-dialog-mode';
import {AssetGeneralFormModel} from './asset-general-form-model';

/**
 * Form Model for Edit Asset Form
 */
export interface AssetCreateFormModel {
  mode: FormControl<AssetEditDialogMode>;
  general: FormGroup<AssetGeneralFormModel>;
}

/**
 * Form Value for Edit Asset Form
 */
export type AssetCreateFormValue = ɵFormGroupValue<AssetCreateFormModel>;
