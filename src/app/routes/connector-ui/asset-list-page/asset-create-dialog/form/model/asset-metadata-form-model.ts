import {FormControl, ɵFormGroupValue} from '@angular/forms';
import {LanguageSelectItem} from '../../../../../../shared/form-elements/language-select/language-select-item';

/**
 * Form Model for AssetCreateDialog > Metadata
 */
export interface AssetMetadataFormModel {
  id: FormControl<string>;
  title: FormControl<string>;
  version: FormControl<string>;
  contentType: FormControl<string>;
  description: FormControl<string>;
  keywords: FormControl<string[]>;
  language: FormControl<LanguageSelectItem | null>;
  publisher: FormControl<string>;
  standardLicense: FormControl<string>;
  endpointDocumentation: FormControl<string>;
}

/**
 * Form Value for AssetCreateDialog > Metadata
 */
export type AssetMetadataFormValue = ɵFormGroupValue<AssetMetadataFormModel>;
