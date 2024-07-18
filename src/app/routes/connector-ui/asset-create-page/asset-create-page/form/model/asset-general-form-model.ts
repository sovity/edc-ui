import {FormControl, ɵFormGroupValue} from '@angular/forms';
import {DataCategorySelectItem} from '../../../data-category-select/data-category-select-item';
import {DataSubcategorySelectItem} from '../../../data-subcategory-select/data-subcategory-select-item';

/**
 * Form Model for Edit Asset Form > Datasource
 */
export interface AssetGeneralFormModel {
  id: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  keywords: FormControl<string[]>;
  dataCategory: FormControl<DataCategorySelectItem | null>;
  dataSubcategory: FormControl<DataSubcategorySelectItem | null>;
}

/**
 * Form Value for Edit Asset Form > Datasource
 */
export type AssetGeneralFormValue = ɵFormGroupValue<AssetGeneralFormModel>;
