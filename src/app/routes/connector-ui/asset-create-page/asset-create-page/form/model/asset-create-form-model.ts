import {FormGroup, ɵFormGroupValue} from '@angular/forms';
import {AssetGeneralFormModel} from './asset-general-form-model';

/**
 * Form Model for Asset Create Form
 */
export interface AssetCreateFormModel {
  // datasource: FormGroup<AssetDatasourceFormModel>;
  general: FormGroup<AssetGeneralFormModel>;
}

/**
 * Form Value for Asset Create Form
 */
export type AssetCreateFormValue = ɵFormGroupValue<AssetCreateFormModel>;
