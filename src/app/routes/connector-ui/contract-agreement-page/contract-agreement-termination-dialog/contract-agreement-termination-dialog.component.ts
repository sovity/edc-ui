import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {
  IdResponseDto,
  InitiateCustomTransferRequest,
  InitiateTransferRequest,
} from '@sovity.de/edc-client';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {DataAddressMapper} from '../../../../core/services/data-address-mapper';
import {NotificationService} from '../../../../core/services/notification.service';
import {TransferDataSinkMapper} from '../../../../core/services/transfer-data-sink-mapper';
import {ValidationMessages} from '../../../../core/validators/validation-messages';
import {
  DATA_SINK_HTTP_METHODS,
  DATA_SOURCE_HTTP_METHODS,
} from '../../asset-page/asset-edit-dialog/form/http-methods';
import {ContractAgreementTerminationDialogData} from './contract-agreement-termination-dialog-data';
import {ContractAgreementTerminationDialogForm} from './contract-agreement-termination-dialog-form';
import {ContractAgreementTransferDialogFormValue} from './contract-agreement-termination-dialog-form-model';
import {ContractAgreementTerminationDialogResult} from './contract-agreement-termination-dialog-result';

@Component({
  selector: 'contract-agreement-transfer-dialog',
  templateUrl: './contract-agreement-termination-dialog.component.html',
  providers: [ContractAgreementTerminationDialogForm],
})
export class ContractAgreementTerminationDialogComponent implements OnDestroy {
  loading = false;

  dataSinkMethods = DATA_SINK_HTTP_METHODS;
  dataSourceMethods = DATA_SOURCE_HTTP_METHODS;

  get proxyMethod(): boolean {
    return (
      this.showAllHttpParameterizationFields ||
      this.data.asset.httpDatasourceHintsProxyMethod === true
    );
  }

  get proxyPath(): boolean {
    return (
      this.showAllHttpParameterizationFields ||
      this.data.asset.httpDatasourceHintsProxyPath === true
    );
  }

  get proxyQueryParams(): boolean {
    return (
      this.showAllHttpParameterizationFields ||
      this.data.asset.httpDatasourceHintsProxyQueryParams === true
    );
  }

  get proxyBody(): boolean {
    return (
      this.showAllHttpParameterizationFields ||
      this.data.asset.httpDatasourceHintsProxyBody === true
    );
  }

  get showHttpParameterizationToggleButton(): boolean {
    return (
      this.data.asset.httpDatasourceHintsProxyMethod !== true ||
      this.data.asset.httpDatasourceHintsProxyPath !== true ||
      this.data.asset.httpDatasourceHintsProxyQueryParams !== true ||
      this.data.asset.httpDatasourceHintsProxyBody !== true
    );
  }

  get showAllHttpParameterizationFields(): boolean {
    return this.form.all.controls.showAllHttpParameterizationFields.value;
  }

  constructor(
    public form: ContractAgreementTerminationDialogForm,
    public validationMessages: ValidationMessages,
    private dialogRef: MatDialogRef<ContractAgreementTerminationDialogComponent>,
    private edcApiService: EdcApiService,
    private notificationService: NotificationService,
    private httpRequestParamsMapper: TransferDataSinkMapper,
    private dataAddressMapper: DataAddressMapper,
    @Inject(MAT_DIALOG_DATA) public data: ContractAgreementTerminationDialogData,
  ) {}

  onSave() {
    if (this.loading && !this.form.all.valid) {
      return;
    }

    this.initiateTransfer();
  }

  private initiateTransfer() {
    this.loading = true;
    this.form.all.disable();

    const value = this.form.value;
    let request$: Observable<IdResponseDto>;
    if (value.dataAddressType === 'Custom-Transfer-Process-Request') {
      const request = this.buildCustomTransferRequest(value);
      request$ = this.edcApiService.initiateCustomTransfer(request);
    } else {
      const request = this.buildTransferRequest(value);
      request$ = this.edcApiService.initiateTransfer(request);
    }

    request$
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.all.enable();
        }),
      )
      .subscribe({
        next: (response) =>
          this.close({
            transferProcessId: response.id!,
            contractId: this.data.contractId,
          }),
        error: (err) => {
          this.notificationService.showError('Failed initiating transfer!');
          console.error('Failed initiating transfer', err);
        },
      });
  }

  private close(params: ContractAgreementTerminationDialogResult) {
    this.dialogRef.close(params);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }

  private buildTransferRequest(
    value: ContractAgreementTransferDialogFormValue,
  ): InitiateTransferRequest {
    const transferProcessProperties =
      this.httpRequestParamsMapper.encodeHttpProxyTransferRequestProperties(
        this.data.asset,
        value,
      );

    const dataSinkProperties =
      this.dataAddressMapper.buildDataAddressProperties(value) ?? {};

    return {
      contractAgreementId: this.data.contractId,
      transferProcessProperties,
      dataSinkProperties,
    };
  }

  private buildCustomTransferRequest(
    value: ContractAgreementTransferDialogFormValue,
  ): InitiateCustomTransferRequest {
    return {
      contractAgreementId: this.data.contractId,
      transferProcessRequestJsonLd: value.transferProcessRequest!,
    };
  }
}
