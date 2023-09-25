import {
  AssetPageToJSON,
  ContractAgreementPageToJSON,
  ContractAgreementTransferRequestFromJSON,
  ContractDefinitionPageToJSON,
  ContractDefinitionRequestFromJSON,
  ContractNegotiationRequestFromJSON,
  FetchAPI,
  IdResponseDtoToJSON,
  PolicyDefinitionCreateRequestFromJSON,
  PolicyDefinitionPageToJSON,
  TransferHistoryPageToJSON,
  UiAssetCreateRequestFromJSON,
  UiAssetToJSON,
  UiContractNegotiationToJSON,
} from '@sovity.de/edc-client';
import {assetPage, createAsset, deleteAsset} from './asset-fake-service';
import {getCatalogPageDataOffers} from './catalog-fake-service';
import {
  contractAgreementInitiateTransfer,
  contractAgreementPage,
} from './contract-agreement-fake-service';
import {
  contractDefinitionPage,
  createContractDefinition,
  deleteContractDefinition,
} from './contract-definition-fake-service';
import {
  getContractNegotiation,
  initiateContractNegotiation,
} from './contract-negotiation-fake-service';
import {
  createPolicyDefinition,
  deletePolicyDefinition,
  policyDefinitionPage,
} from './policy-definition-fake-service';
import {
  transferHistoryPage,
  transferProcessAsset,
} from './transfer-history-fake-service';
import {getBody, getMethod, getUrl} from './utils/request-utils';
import {ok} from './utils/response-utils';
import {UrlInterceptor} from './utils/url-interceptor';

export const EDC_FAKE_BACKEND: FetchAPI = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  let url = getUrl(input, 'http://edc.fake-backend/wrapper/ui/');
  let method = getMethod(init);
  let body = getBody(init);

  console.log(...['Fake Backend:', method, url, body].filter((it) => !!it));

  return new UrlInterceptor(url, method)

    .url('pages/asset-page')
    .on('GET', () => {
      const page = assetPage();
      return ok(AssetPageToJSON(page));
    })

    .url('pages/asset-page/assets')
    .on('POST', () => {
      let createRequest = UiAssetCreateRequestFromJSON(body);
      let created = createAsset(createRequest);
      return ok(IdResponseDtoToJSON(created));
    })

    .url('pages/asset-page/assets/*')
    .on('DELETE', (assetId) => {
      let deleted = deleteAsset(assetId);
      return ok(IdResponseDtoToJSON(deleted));
    })

    .url('pages/contract-agreement-page')
    .on('GET', () => {
      const page = contractAgreementPage();
      return ok(ContractAgreementPageToJSON(page));
    })

    .url('pages/contract-agreement-page/transfers')
    .on('POST', () => {
      let transferRequest = ContractAgreementTransferRequestFromJSON(body);
      let created = contractAgreementInitiateTransfer(transferRequest);
      return ok(IdResponseDtoToJSON(created));
    })

    .url('pages/contract-definition-page')
    .on('GET', () => {
      let page = contractDefinitionPage();
      return ok(ContractDefinitionPageToJSON(page));
    })

    .url('pages/contract-definition-page/contract-definitions')
    .on('POST', () => {
      let createRequest = ContractDefinitionRequestFromJSON(body);
      let created = createContractDefinition(createRequest);
      return ok(IdResponseDtoToJSON(created));
    })

    .url('pages/contract-definition-page/contract-definitions/*')
    .on('DELETE', (contractDefinitionId) => {
      let deleted = deleteContractDefinition(contractDefinitionId);
      return ok(IdResponseDtoToJSON(deleted));
    })

    .url('pages/policy-page')
    .on('GET', () => {
      let page = policyDefinitionPage();
      return ok(PolicyDefinitionPageToJSON(page));
    })

    .url('pages/policy-page/policy-definitions')
    .on('POST', () => {
      let createRequest = PolicyDefinitionCreateRequestFromJSON(body);
      let created = createPolicyDefinition(createRequest);
      return ok(IdResponseDtoToJSON(created));
    })

    .url('pages/policy-page/policy-definitions/*')
    .on('DELETE', (policyDefinitionId) => {
      let deleted = deletePolicyDefinition(policyDefinitionId);
      return ok(IdResponseDtoToJSON(deleted));
    })

    .url('pages/transfer-history-page')
    .on('GET', () => {
      let page = transferHistoryPage();
      return ok(TransferHistoryPageToJSON(page));
    })

    .url('pages/transfer-history-page/transfer-processes/*/asset')
    .on('GET', (transferProcessId) => {
      let asset = transferProcessAsset(transferProcessId);
      return ok(UiAssetToJSON(asset));
    })

    .url('pages/catalog-page/data-offers')
    .on('GET', (connectorEndpoint) => {
      let dataOffers = getCatalogPageDataOffers(connectorEndpoint);
      return ok(dataOffers);
    })

    .url('pages/catalog-page/contract-negotiations')
    .on('POST', () => {
      let createRequest = ContractNegotiationRequestFromJSON(body);

      let contractNegotiation = initiateContractNegotiation(createRequest);

      return ok(UiContractNegotiationToJSON(contractNegotiation));
    })

    .url('pages/catalog-page/contract-negotiations')
    .on('POST', (contractNegotiationId) => {
      let contractNegotiation = getContractNegotiation(contractNegotiationId);
      return ok(contractNegotiation);
    })

    .tryMatch();
};
