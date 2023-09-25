import {UiContractOffer} from '@sovity.de/edc-client';
import {Asset} from './asset';

/**
 * Contract Offer (UI Dto)
 */
export type ContractOffer = Omit<UiContractOffer, 'asset'> & {
  asset: Asset;
};
