import {
  ContractDefinitionEntry,
  PolicyDefinitionDto,
} from '@sovity.de/edc-client';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export interface DataOfferCard {
  id: string;
  criteria: DataOfferCardCriterion[];
  contractPolicy: DataOfferCardPolicy;
  accessPolicy: DataOfferCardPolicy;

  detailJsonObj: ContractDefinitionEntry;
}

export interface DataOfferCardPolicy {
  policyDefinitionId: string;
  policyDefinition: PolicyDefinitionDto | null;
}

export interface DataOfferCardCriterion {
  label: string;
  values: DataOfferCardCriterionValue[];
}

export interface DataOfferCardCriterionValue {
  type: 'string' | 'asset' | 'json';
  searchTargets: (string | null)[];
  value?: string;
  asset?: UiAssetMapped;
  json?: any;
}
