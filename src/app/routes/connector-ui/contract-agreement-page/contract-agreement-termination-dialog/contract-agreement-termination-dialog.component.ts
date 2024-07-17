import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ValidationMessages} from '../../../../core/validators/validation-messages';
import {ContractAgreementTerminationDialogData} from './contract-agreement-termination-dialog-data';
import {ContractAgreementTerminationDialogForm} from './contract-agreement-termination-dialog-form';
import {ContractAgreementTerminationDialogResult} from './contract-agreement-termination-dialog-result';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'contract-agreement-transfer-dialog',
  templateUrl: './contract-agreement-termination-dialog.component.html',
  providers: [ContractAgreementTerminationDialogForm],
})
export class ContractAgreementTerminationDialogComponent implements OnDestroy {
  loading = false;
  checkboxChecked = false;

  constructor(
    public form: ContractAgreementTerminationDialogForm,
    public validationMessages: ValidationMessages,
    private dialogRef: MatDialogRef<ContractAgreementTerminationDialogComponent>,
    //private edcApiService: EdcApiService,
    //private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: ContractAgreementTerminationDialogData,
  ) {}

  public onCheckboxChange($event: MatCheckboxChange) {
    this.checkboxChecked = $event.checked;
  }

  onSave() {
    if (this.loading && !this.form.all.valid) {
      return;
    }
    this.close({contractId: '', lastUpdatedTime: null});
  }


  private close(params: ContractAgreementTerminationDialogResult) {
    this.dialogRef.close(params);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
