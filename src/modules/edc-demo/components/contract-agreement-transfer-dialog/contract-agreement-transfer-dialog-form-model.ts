import {FormGroup, ɵFormGroupValue} from '@angular/forms';
import {ContractAgreementDatasinkFormModel} from './model/contract-agreement-datasink-form-model';

/**
 * Form Value Type
 */
export type ContractAgreementTransferDialogFormValue =
  ɵFormGroupValue<ContractAgreementTransferDialogFormModel>;

/**
 * Form Group Template Type
 */
export interface ContractAgreementTransferDialogFormModel {
  datasink: FormGroup<ContractAgreementDatasinkFormModel>;
}
