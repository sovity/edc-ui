import {UiDataOffer} from '@sovity.de/edc-client';
import {TestAssets} from './data/test-assets';
import {TestPolicies} from './data/test-policies';

export let uiDataOffers: UiDataOffer[] = [
  {
    endpoint: 'https://sovity-demo2-edc/api/v1/ids/data',
    participantId: 'sovity-demo2-edc',
    asset: TestAssets.full,
    contractOffers: [
      {
        contractOfferId: 'test-contract-offer-1',
        policy: TestPolicies.connectorRestricted,
      },
      {
        contractOfferId: 'test-contract-offer-2',
        policy: TestPolicies.warnings,
      },
    ],
  },
  {
    endpoint: 'https://sovity-demo4-mds/api/v1/ids/data',
    asset: TestAssets.boring,
    participantId: 'sovity-demo4-mds',
    contractOffers: [
      {
        contractOfferId: 'test-contract-offer-3',
        policy: TestPolicies.failedMapping,
      },
    ],
  },
];

export const getCatalogPageDataOffers = (
  connectorEndpoint: string,
): UiDataOffer[] => {
  return uiDataOffers.filter((it) => it.endpoint === connectorEndpoint);
};
