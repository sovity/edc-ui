import {ContractAgreementCard} from '@sovity.de/edc-client';
import {Asset} from '../../../../core/services/models/asset';

export type ContractAgreementCardMapped = Omit<
  ContractAgreementCard,
  'asset'
> & {
  asset: Asset;
  isInProgress: boolean;
  statusText: string;
  statusTooltipText: string | null;
  searchTargets: (string | null)[];
};
