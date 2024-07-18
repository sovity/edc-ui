import {
  AssetDatasourceFormModel,
  AssetDatasourceFormValue,
} from './asset-datasource-form-model';

export const assetDatasourceFormEnabledCtrls = (
  value: AssetDatasourceFormValue,
): Record<keyof AssetDatasourceFormModel, boolean> => {
  const customDataAddressJson =
    value.dataAddressType === 'Custom-Data-Address-Json';

  const onRequest = value.datasourceType === 'On-Request';

  const http = value.dataAddressType === 'Http';
  const httpAuth = value.httpAuthHeaderType !== 'None';
  const httpAuthByValue = value.httpAuthHeaderType === 'Value';
  const httpAuthByVault = value.httpAuthHeaderType === 'Vault-Secret';
  const proxyPath = !!value.httpProxyPath;

  return {
    datasourceType: true,

    // On Request Datasource
    contactEmail: onRequest,
    contactPreferredEmailSubject: onRequest,

    dataAddressType: !onRequest,

    // Custom Datasource JSON
    dataDestination: !onRequest && customDataAddressJson,

    // Http Datasource Fields
    httpUrl: !onRequest && http,
    httpMethod: !onRequest && http && !value.httpProxyMethod,

    httpAuthHeaderType: !onRequest && http,
    httpAuthHeaderName: !onRequest && http && httpAuth,
    httpAuthHeaderValue: !onRequest && http && httpAuthByValue,
    httpAuthHeaderSecretName: !onRequest && http && httpAuthByVault,
    httpQueryParams: !onRequest && http,

    httpDefaultPath: !onRequest && http && proxyPath,
    httpProxyMethod: !onRequest && http,
    httpProxyPath: !onRequest && http,
    httpProxyQueryParams: !onRequest && http,
    httpProxyBody: !onRequest && http,

    httpHeaders: !onRequest && http,
  };
};
