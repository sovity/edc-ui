import {UiContractOffer, UiDataOffer} from '@sovity.de/edc-client';
import {Fetched} from '../../../../core/services/models/fetched';
import {MultiFetched} from '../../../../core/services/models/multi-fetched';

export interface CatalogBrowserPageData {
  requestTotals: MultiFetched<UiDataOffer[]>;
  requests: ContractOfferRequest[];
  filteredContractOffers: UiContractOffer[];
  numTotalContractOffers: number;
}

export function emptyCatalogBrowserPageData(): CatalogBrowserPageData {
  return {
    requests: [],
    requestTotals: MultiFetched.empty(),
    filteredContractOffers: [],
    numTotalContractOffers: 0,
  };
}

export interface ContractOfferRequest {
  url: string;
  isPresetUrl: boolean;
  data: Fetched<UiDataOffer[]>;
}
