import {
  FormArray,
  FormControl,
  FormGroup,
  ɵFormGroupValue,
} from '@angular/forms';
import {DataAddressType} from '../../data-address-type-select/data-address-type';
import {HttpDatasinkAuthHeaderType} from './http-datasink-auth-header-type';
import {HttpDatasinkHeaderFormModel} from './http-datasink-header-form-model';

/* Form Model for ContractAgreementTransferDialog > DataSink */
export interface ContractAgreementDatasinkFormModel {
  dataAddressType: FormControl<DataAddressType>;
  publisher: FormControl<string>;
  standardLicense: FormControl<string>;
  endpointDocumentation: FormControl<string>;

  // Custom Datasink JSON
  dataDestination: FormControl<string>;

  // Http Datasink
  httpUrl: FormControl<string>;
  httpMethod: FormControl<string>;

  httpRequestBodyEnabled: FormControl<boolean>;
  httpRequestBodyValue: FormControl<string>;
  httpContentType: FormControl<string>;

  httpAuthHeaderType: FormControl<HttpDatasinkAuthHeaderType>;
  httpAuthHeaderName: FormControl<string>;
  httpAuthHeaderValue: FormControl<string>;
  httpAuthHeaderSecretName: FormControl<string>;
  httpHeaders: FormArray<FormGroup<HttpDatasinkHeaderFormModel>>;
}

/*
 * Form Value for ContractAgreementTransferDialog > Datasink
 */
export type ContractAgreementDatasinkFormValue =
  ɵFormGroupValue<ContractAgreementDatasinkFormModel>;
