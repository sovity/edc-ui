import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataAddressType} from '../../../../component-library/data-address/data-address-type-select/data-address-type';
import {switchDisabledControls} from '../../../../core/utils/form-group-utils';
import {jsonValidator} from '../../../../core/validators/json-validator';
import {urlValidator} from '../../../../core/validators/url-validator';
import {
  HttpDatasourceQueryParamFormModel
} from '../../asset-page/asset-edit-dialog/form/model/http-datasource-query-param-form-model';
import {
  ContractAgreementTerminationDialogFormModel,
  ContractAgreementTransferDialogFormValue,
} from './contract-agreement-termination-dialog-form-model';

/**
 * Handles AngularForms for ContractAgreementTransferDialog
 */
@Injectable()
export class ContractAgreementTerminationDialogForm {
  all = this.buildFormGroup();

  /**
   * Quick access to selected data address type
   */
  get dataAddressType(): DataAddressType | null {
    return this.all.controls.dataAddressType.value;
  }

  /**
   * Quick access to full value
   */
  get value(): ContractAgreementTransferDialogFormValue {
    return this.all.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  buildFormGroup(): FormGroup<ContractAgreementTerminationDialogFormModel> {
    const all: FormGroup<ContractAgreementTerminationDialogFormModel> =
      this.formBuilder.nonNullable.group({
        dataAddressType: 'Http' as DataAddressType,
        dataDestination: ['', [Validators.required, jsonValidator]],
        transferProcessRequest: ['', [Validators.required, jsonValidator]],

        // Http Datasink Fields
        httpUrl: ['', [Validators.required, urlValidator]],
        httpMethod: ['POST', Validators.required],

        showAllHttpParameterizationFields: [false],

        httpProxiedPath: [''],
        httpProxiedMethod: [''],
        httpProxiedQueryParams: this.formBuilder.array(
          new Array<FormGroup<HttpDatasourceQueryParamFormModel>>(),
        ),
        httpProxiedBody: [''],
        httpProxiedBodyContentType: [''],
      });

    switchDisabledControls<ContractAgreementTransferDialogFormValue>(
      all,
      (value) => {
        const customDataAddressJson =
          value.dataAddressType === 'Custom-Data-Address-Json';

        const customTransferProcessRequest =
          value.dataAddressType === 'Custom-Transfer-Process-Request';

        const http = value.dataAddressType === 'Http';

        return {
          dataAddressType: true,

          // Custom Datasink JSON
          dataDestination: customDataAddressJson,
          transferProcessRequest: customTransferProcessRequest,

          // Http Datasink Fields
          httpUrl: http,
          httpMethod: http,

          httpAuthHeaderType: http,

          httpHeaders: http,

          showAllHttpParameterizationFields: !customTransferProcessRequest,

          httpProxiedPath: !customTransferProcessRequest,
          httpProxiedMethod: !customTransferProcessRequest,
          httpProxiedQueryParams: !customTransferProcessRequest,
          httpProxiedBody: !customTransferProcessRequest,
          httpProxiedBodyContentType: !customTransferProcessRequest,
        };
      },
    );
    return all;
  }

  buildQueryParamFormGroup(): FormGroup<HttpDatasourceQueryParamFormModel> {
    return this.formBuilder.nonNullable.group({
      paramName: ['', Validators.required],
      paramValue: [''],
    });
  }}

