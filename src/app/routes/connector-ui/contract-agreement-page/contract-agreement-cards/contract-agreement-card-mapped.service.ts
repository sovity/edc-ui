import {Injectable} from '@angular/core';
import {ContractAgreementCard} from '@sovity.de/edc-client';
import {AssetPropertyMapper} from '../../../../core/services/asset-property-mapper';
import {assetSearchTargets, search} from '../../../../core/utils/search-utils';
import {ContractAgreementCardMapped} from './contract-agreement-card-mapped';

@Injectable({providedIn: 'root'})
export class ContractAgreementCardMappedService {
  constructor(private assetPropertyMapper: AssetPropertyMapper) {}

  /**
   * Replace the asset with the parsed asset and add the other required fields of the UI model
   *
   * {@link ContractAgreementCardMapped}
   * @param contractAgreement {@link ContractAgreementCard}
   * @returns {@link ContractAgreementCardMapped}
   */
  buildContractAgreementCardMapped(
    contractAgreement: ContractAgreementCard,
  ): ContractAgreementCardMapped {
    let asset = this.assetPropertyMapper.buildAssetFromProperties(
      contractAgreement.asset.properties,
    );
    return {
      ...contractAgreement,
      asset,
      isInProgress: contractAgreement.transferProcesses.some(
        (it) => it.state.simplifiedState === 'RUNNING',
      ),
      isConsumingLimitsEnforced: false,
      statusText: '',
      statusTooltipText: '',
      searchTargets: [
        contractAgreement.contractAgreementId,
        contractAgreement.counterPartyId,
        contractAgreement.counterPartyAddress,
        ...assetSearchTargets(asset),
      ],
    };
  }

  filter(
    cards: ContractAgreementCardMapped[],
    searchText: string,
  ): ContractAgreementCardMapped[] {
    return search(cards, searchText, (card) => card.searchTargets);
  }

  setStatus(
    maxConsumingContracts: number,
    agreements: ContractAgreementCardMapped[],
  ): ContractAgreementCardMapped[] {
    return agreements.map((it, index) => ({
      ...it,
      isConsumingLimitsEnforced: true,
      statusText: index < maxConsumingContracts ? 'Active' : 'Inactive',
      statusTooltipText:
        index >= maxConsumingContracts
          ? maxConsumingContracts == 1
            ? 'This connector is configured with a limit of ' +
              maxConsumingContracts +
              ' active consuming contract agreement, causing contract agreement to get disabled if new ones are negotiated.'
            : 'This connector is configured with a limit of ' +
              maxConsumingContracts +
              ' active consuming contract agreements, causing contract agreements to get disabled if new ones are negotiated.'
          : '',
    }));
  }
}
