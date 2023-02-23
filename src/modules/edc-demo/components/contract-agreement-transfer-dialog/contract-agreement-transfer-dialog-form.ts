import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataAddressType} from '../data-address-type-select/data-address-type';
import {
  ContractAgreementTransferDialogFormModel,
  ContractAgreementTransferDialogFormValue,
} from './contract-agreement-transfer-dialog-form-model';
import {ContractAgreementDatasinkFormBuilder} from './model/contract-agreement-datasink-form-builder';
import {ContractAgreementDatasinkFormModel} from './model/contract-agreement-datasink-form-model';

/**
 * Handles AngularForms for ContractAgreementTransferDialog
 */
@Injectable()
export class ContractAgreementTransferDialogForm {
  all = this.buildFormGroup();

  /**
   * FormGroup for "Data Sink"
   */
  datasink = this.all.controls.datasink;

  /**
   * Quick access to selected data address type
   */
  get dataAddressType(): DataAddressType | null {
    return this.datasink.controls.dataAddressType.value;
  }

  /**
   * Quick access to full value
   */
  get value(): ContractAgreementTransferDialogFormValue {
    return this.all.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private contractAgreementDatasinkFormBuilder: ContractAgreementDatasinkFormBuilder,
  ) {}

  buildFormGroup(): FormGroup<ContractAgreementTransferDialogFormModel> {
    const datasink: FormGroup<ContractAgreementDatasinkFormModel> =
      this.contractAgreementDatasinkFormBuilder.buildFormGroup();

    const formGroup: FormGroup<ContractAgreementTransferDialogFormModel> =
      this.formBuilder.nonNullable.group({
        datasink,
      });

    return formGroup;
  }

  onHttpHeadersAddClick() {
    this.datasink.controls.httpHeaders.push(
      this.contractAgreementDatasinkFormBuilder.buildHeaderFormGroup(),
    );
  }

  onHttpHeadersRemoveClick(index: number) {
    this.datasink.controls.httpHeaders.removeAt(index);
  }
}
