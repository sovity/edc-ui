import {UiAsset, UiPolicy} from '@sovity.de/edc-client';

/**
 * Contract Offer (API Model)
 */
export interface ContractOfferDto {
  id: string;
  policy: UiPolicy;
  provider: string;
  consumer: string;
  asset: UiAsset;
}
