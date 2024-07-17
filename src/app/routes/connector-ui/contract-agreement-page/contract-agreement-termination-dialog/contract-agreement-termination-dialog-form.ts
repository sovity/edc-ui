import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ContractAgreementTerminationDialogFormModel,
  ContractAgreementTransferDialogFormValue,
} from './contract-agreement-termination-dialog-form-model';

/**
 * Handles AngularForms for ContractAgreementTerminationDialog
 */
@Injectable()
export class ContractAgreementTerminationDialogForm {
  all = this.buildFormGroup();

  /**
   * Quick access to full value
   */
  get value(): ContractAgreementTransferDialogFormValue {
    return this.all.value;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  buildFormGroup(): FormGroup<ContractAgreementTerminationDialogFormModel> {
    return this.formBuilder.nonNullable.group({
      shortReason: ['', Validators.required],
      detailedReason: ['']
    });
  }
}

