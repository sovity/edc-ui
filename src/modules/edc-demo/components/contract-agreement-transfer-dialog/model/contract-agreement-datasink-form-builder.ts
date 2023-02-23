import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchDisabledControls} from '../../../utils/form-group-utils';
import {jsonValidator} from '../../../validators/json-validator';
import {urlValidator} from '../../../validators/url-validator';
import {DataAddressType} from '../../data-address-type-select/data-address-type';
import {
  ContractAgreementDatasinkFormModel,
  ContractAgreementDatasinkFormValue,
} from './contract-agreement-datasink-form-model';
import {HttpDatasinkAuthHeaderType} from './http-datasink-auth-header-type';
import {HttpDatasinkHeaderFormModel} from './http-datasink-header-form-model';

@Injectable()
export class ContractAgreementDatasinkFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  buildFormGroup(): FormGroup<ContractAgreementDatasinkFormModel> {
    const datasink: FormGroup<ContractAgreementDatasinkFormModel> =
      this.formBuilder.nonNullable.group({
        dataAddressType: 'Http' as DataAddressType,
        dataDestination: ['', [Validators.required, jsonValidator]],
        publisher: ['', urlValidator],
        standardLicense: ['', urlValidator],
        endpointDocumentation: ['', urlValidator],

        // Http Datasink Fields
        httpUrl: ['', [Validators.required, urlValidator]],
        httpMethod: ['GET', Validators.required],

        httpRequestBodyEnabled: [false],
        httpRequestBodyValue: ['', Validators.required],
        httpContentType: ['', Validators.required],

        httpAuthHeaderType: ['None' as HttpDatasinkAuthHeaderType],
        httpAuthHeaderName: ['', Validators.required],
        httpAuthHeaderValue: ['', Validators.required],
        httpAuthHeaderSecretName: ['', Validators.required],

        httpHeaders: this.formBuilder.array(
          new Array<FormGroup<HttpDatasinkHeaderFormModel>>(),
        ),
      });

    switchDisabledControls<ContractAgreementDatasinkFormValue>(
      datasink,
      (value) => {
        const customDataAddressJson =
          value.dataAddressType === 'Custom-Data-Address-Json';

        const http = value.dataAddressType === 'Http';
        const requestBody = !!value.httpRequestBodyEnabled;
        const httpAuth = value.httpAuthHeaderType !== 'None';
        const httpAuthByValue = value.httpAuthHeaderType === 'Value';
        const httpAuthByVault = value.httpAuthHeaderType === 'Vault-Secret';

        return {
          dataAddressType: true,
          publisher: true,
          standardLicense: true,
          endpointDocumentation: true,

          // Custom Datasink JSON
          dataDestination: customDataAddressJson,

          // Http Datasink Fields
          httpUrl: http,
          httpMethod: http,

          httpRequestBodyEnabled: http,
          httpRequestBodyValue: http && requestBody,
          httpContentType: http && requestBody,

          httpAuthHeaderType: http,
          httpAuthHeaderName: http && httpAuth,
          httpAuthHeaderValue: http && httpAuthByValue,
          httpAuthHeaderSecretName: http && httpAuthByVault,

          httpHeaders: http,
        };
      },
    );

    return datasink;
  }

  buildHeaderFormGroup(): FormGroup<HttpDatasinkHeaderFormModel> {
    return this.formBuilder.nonNullable.group({
      headerName: ['', Validators.required],
      headerValue: ['', Validators.required],
    });
  }
}
