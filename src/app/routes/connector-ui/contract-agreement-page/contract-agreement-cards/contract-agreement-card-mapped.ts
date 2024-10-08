import {ContractAgreementCard} from '@sovity.de/edc-client';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export type ContractAgreementCardMapped = Omit<
  ContractAgreementCard,
  'asset'
> & {
  asset: UiAssetMapped;
  isInProgress: boolean;
  isConsumingLimitsEnforced: boolean;
  isTerminated: boolean;
  searchTargets: (string | null)[];
};
