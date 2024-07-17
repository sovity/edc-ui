import {
  FormArray,
  FormControl,
  FormGroup,
  ɵFormGroupValue,
} from '@angular/forms';
import {DataAddressType} from '../../../../component-library/data-address/data-address-type-select/data-address-type';
import {HttpDatasourceQueryParamFormModel} from '../../asset-page/asset-edit-dialog/form/model/http-datasource-query-param-form-model';

/**
 * Form Value Type
 */
export type ContractAgreementTransferDialogFormValue =
  ɵFormGroupValue<ContractAgreementTerminationDialogFormModel>;

/**
 * Form Group Template Type
 */
export interface ContractAgreementTerminationDialogFormModel {
  dataAddressType: FormControl<DataAddressType>;

  // Custom Datasink JSON
  dataDestination: FormControl<string>;

  // Custom Transfer Process Request JSON
  transferProcessRequest: FormControl<string>;

  // Http Datasink
  httpUrl: FormControl<string>;
  httpMethod: FormControl<string>;

  showAllHttpParameterizationFields: FormControl<boolean>;

  // Http Datasource Parameterization
  httpProxiedPath: FormControl<string>;
  httpProxiedMethod: FormControl<string>;
  httpProxiedQueryParams: FormArray<
    FormGroup<HttpDatasourceQueryParamFormModel>
  >;
  httpProxiedBody: FormControl<string>;
  httpProxiedBodyContentType: FormControl<string>;
}
