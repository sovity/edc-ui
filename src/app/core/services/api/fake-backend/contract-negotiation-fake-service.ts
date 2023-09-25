import {
  ContractNegotiationRequest,
  ContractNegotiationState,
  ContractNegotiationStateSimplifiedStateEnum,
  UiContractNegotiation,
} from '@sovity.de/edc-client';

export let contractNegotiationStates: ContractNegotiationState[] = [
  {
    name: 'INITIATED',
    code: 500,
    simplifiedState: ContractNegotiationStateSimplifiedStateEnum.InProgress,
  },
  {
    name: 'AGREED',
    code: 1000,
    simplifiedState: ContractNegotiationStateSimplifiedStateEnum.Agreed,
  },
];
export let contractNegotiations: UiContractNegotiation[] = [
  {
    contractNegotiationId: 'test-contract-negotiation-1',
    createdAt: new Date(),
    contractAgreementId: 'test-contract-agreement-1',
    state: contractNegotiationStates[0],
  },
  {
    contractNegotiationId: 'test-contract-negotiation-2',
    createdAt: new Date(),
    contractAgreementId: 'test-contract-agreement-2',
    state: contractNegotiationStates[1],
  },
];

export let contractNegotiationRequests: ContractNegotiationRequest[] = [
  {
    counterPartyAddress: 'https://sovity-demo2-edc/api/v1/ids/data',
    counterPartyParticipantId: 'sovity-demo2-edc',
    contractOfferId: 'test-contract-definition-1',
    policyJsonLd: '{"example-policy-jsonld": true}',
    assetId: 'urn:artifact:test-asset-1',
  },
  {
    counterPartyAddress: 'https://sovity-demo4-mds/api/v1/ids/data',
    counterPartyParticipantId: 'sovity-demo4-mds',
    contractOfferId: 'test-contract-definition-2',
    policyJsonLd: '{"example-policy-jsonld": true}',
    assetId: 'urn:artifact:test-asset-2',
  },
];

export const initiateContractNegotiation = (
  request: ContractNegotiationRequest,
): UiContractNegotiation => {
  contractNegotiations = [...contractNegotiations];

  return contractNegotiations[0];
};

export const getContractNegotiation = (id: string): UiContractNegotiation => {
  contractNegotiations = contractNegotiations.filter(
    (it) => it.contractNegotiationId !== id,
  );
  return contractNegotiations[0];
};
