import {Injectable} from '@angular/core';
import {ContractAgreementTransferDialogFormValue} from '../../routes/connector-ui/contract-agreement-page/contract-agreement-transfer-dialog/contract-agreement-transfer-dialog-form-model';
import {HttpDatasourceHeaderFormValue} from '../../shared/business/edit-asset-form/form/model/http-datasource-header-form-model';
import {getAuthFields} from '../utils/form-value-utils';
import {mapKeys, removeNullValues} from '../utils/record-utils';
import {DataAddressProperty} from './models/data-address-properties';
import {HttpDataAddressParams} from './models/http-data-address-params';
import {QueryParamsMapper} from './query-params-mapper';

@Injectable({providedIn: 'root'})
export class TransferDataSinkMapper {
  constructor(private queryParamsMapper: QueryParamsMapper) {}

  buildHttpDataAddress(
    formValue: ContractAgreementTransferDialogFormValue,
  ): Record<string, string> {
    const params = this.buildHttpRequestParams(formValue);
    return this.encodeHttpRequestParams(params);
  }
  encodeHttpRequestParams(
    httpRequestParams: HttpDataAddressParams,
  ): Record<string, string> {
    const props: Record<string, string | null> = {
      [DataAddressProperty.type]: 'HttpData',
      [DataAddressProperty.baseUrl]: httpRequestParams.baseUrl,
      [DataAddressProperty.method]: httpRequestParams.method,
      [DataAddressProperty.authKey]: httpRequestParams.authHeaderName,
      [DataAddressProperty.authCode]: httpRequestParams.authHeaderValue,
      [DataAddressProperty.secretName]: httpRequestParams.authHeaderSecretName,
      [DataAddressProperty.queryParams]: httpRequestParams.queryParams,
      ...mapKeys(httpRequestParams.headers, (k) => {
        if (k.toLowerCase() === 'content-type') {
          // this is required because the EDC sends the Content-Type header if and only if provided using the special field "contentType"
          return DataAddressProperty.contentType;
        }
        return `${DataAddressProperty.header}:${k}`;
      }),
    };
    return removeNullValues(props);
  }

  buildHttpRequestParams(
    formValue: ContractAgreementTransferDialogFormValue,
  ): HttpDataAddressParams {
    const {authHeaderName, authHeaderValue, authHeaderSecretName} =
      getAuthFields(formValue);

    let method = formValue?.httpMethod?.trim().toUpperCase() || null;

    const baseUrl = this.queryParamsMapper.getBaseUrlWithoutQueryParams(
      formValue?.httpUrl!!,
    );
    const queryParams = this.queryParamsMapper.getFullQueryString(
      formValue?.httpUrl!!,
      [],
    );

    return {
      baseUrl: baseUrl!!,
      method,
      authHeaderName,
      authHeaderValue,
      authHeaderSecretName,
      queryParams,
      headers: this.buildHttpHeaders(formValue?.httpHeaders ?? []),
    };
  }

  private buildHttpHeaders(
    headers: HttpDatasourceHeaderFormValue[],
  ): Record<string, string> {
    return Object.fromEntries(
      headers
        .map((header) => [
          header.headerName?.trim() || '',
          header.headerValue?.trim() || '',
        ])
        .filter((a) => a[0] && a[1]),
    );
  }
}
