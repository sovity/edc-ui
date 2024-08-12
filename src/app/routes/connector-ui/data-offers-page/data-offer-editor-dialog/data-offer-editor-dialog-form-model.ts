import {FormControl, ɵFormGroupValue} from '@angular/forms';
import {PolicyDefinitionDto} from '@sovity.de/edc-client';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

/**
 * Form Value Type
 */
export type DataOfferEditorDialogFormValue =
  ɵFormGroupValue<DataOfferEditorDialogFormModel>;

/**
 * Form Group Template Type
 */
export interface DataOfferEditorDialogFormModel {
  id: FormControl<string>;
  accessPolicy: FormControl<PolicyDefinitionDto | null>;
  contractPolicy: FormControl<PolicyDefinitionDto | null>;
  assets: FormControl<UiAssetMapped[]>;
}
