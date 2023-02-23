import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {
  ContractAgreementService,
  DataAddressDto,
} from '../../../edc-dmgmt-client';
import {HttpDatasinkProperties} from '../../models/http-datasink-properties';
import {AssetEntryBuilder} from '../../services/asset-entry-builder';
import {NotificationService} from '../../services/notification.service';
import {removeNullValues} from '../../utils/record-utils';
import {ValidationMessages} from '../../validators/validation-messages';
import {ContractAgreementTransferDialogData} from './contract-agreement-transfer-dialog-data';
import {ContractAgreementTransferDialogForm} from './contract-agreement-transfer-dialog-form';
import {ContractAgreementTransferDialogFormValue} from './contract-agreement-transfer-dialog-form-model';
import {ContractAgreementTransferDialogResult} from './contract-agreement-transfer-dialog-result';
import {ContractAgreementDatasinkFormBuilder} from './model/contract-agreement-datasink-form-builder';
import {HttpDatasinkFormMapper} from './model/http-datasink-form-mapper';

@Component({
  selector: 'edc-demo-contract-agreement-transfer-dialog',
  templateUrl: './contract-agreement-transfer-dialog.component.html',
  providers: [
    ContractAgreementTransferDialogForm,
    AssetEntryBuilder,
    ContractAgreementDatasinkFormBuilder,
  ],
})
export class ContractAgreementTransferDialog implements OnDestroy {
  loading = false;

  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

  constructor(
    public form: ContractAgreementTransferDialogForm,
    public validationMessages: ValidationMessages,
    private dialogRef: MatDialogRef<ContractAgreementTransferDialog>,
    private contractAgreementService: ContractAgreementService,
    private notificationService: NotificationService,
    private httpDatasinkFormMapper: HttpDatasinkFormMapper,
    @Inject(MAT_DIALOG_DATA) private data: ContractAgreementTransferDialogData,
  ) {}

  onSave() {
    if (this.loading && !this.form.all.valid) {
      return;
    }
    this.loading = true;
    this.form.all.disable();

    this.contractAgreementService
      .initiateTransfer(
        this.data.contractId,
        this.buildDataAddressDto(this.form.value),
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.all.enable();
        }),
      )
      .subscribe({
        next: (transferProcessId) =>
          this.close({
            transferProcessId,
            contractId: this.data.contractId,
          }),
        error: (err) => {
          this.notificationService.showError('Failed initiating transfer!');
          console.error('Failed initiating transfer', err);
        },
      });
  }

  private buildDataAddressDto(
    formValue: ContractAgreementTransferDialogFormValue,
  ): DataAddressDto {
    switch (formValue.datasink?.dataAddressType) {
      case 'Custom-Data-Address-Json':
        return JSON.parse(formValue.datasink?.dataDestination?.trim()!!);
      case 'Http':
        const httpDatasinkProperties =
          this.httpDatasinkFormMapper.buildHttpDatasinkProperties(
            formValue.datasink,
          );
        return {
          properties: {
            type: 'HttpData',
            ...this.encodeHttpDatasinkProperties(httpDatasinkProperties),
          },
        };
      default:
        throw new Error(
          `Invalid Data Address Type ${formValue.datasink?.dataAddressType}`,
        );
    }
  }

  private encodeHttpDatasinkProperties(
    httpDatasink: HttpDatasinkProperties,
  ): Record<string, string> {
    const props: Record<string, string | null> = {
      baseUrl: httpDatasink.url,
      method: httpDatasink.method,
      body: httpDatasink.body,
      contentType: httpDatasink.contentType,
      authKey: httpDatasink.authHeaderName,
      authCode: httpDatasink.authHeaderValue,
      secretName: httpDatasink.authHeaderSecretName,
      ...Object.fromEntries(
        Object.entries(httpDatasink.headers).map(
          ([headerName, headerValue]) => [`header:${headerName}`, headerValue],
        ),
      ),
    };
    return removeNullValues(props);
  }

  private close(params: ContractAgreementTransferDialogResult) {
    this.dialogRef.close(params);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
