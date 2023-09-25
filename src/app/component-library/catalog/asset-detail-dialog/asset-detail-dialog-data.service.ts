import {Injectable} from '@angular/core';
import {UiContractOffer, UiDataOffer} from '@sovity.de/edc-client';
import {AssetPropertyMapper} from '../../../core/services/asset-property-mapper';
import {Asset} from '../../../core/services/models/asset';
import {BrokerDataOffer} from '../../../routes/broker-ui/catalog-page/catalog-page/mapping/broker-data-offer';
import {ContractAgreementCardMapped} from '../../../routes/connector-ui/contract-agreement-page/contract-agreement-cards/contract-agreement-card-mapped';
import {AssetDetailDialogData} from './asset-detail-dialog-data';
import {AssetPropertyGridGroupBuilder} from './asset-property-grid-group-builder';

@Injectable()
export class AssetDetailDialogDataService {
  constructor(
    private assetPropertyMapper: AssetPropertyMapper,
    private assetPropertyGridGroupBuilder: AssetPropertyGridGroupBuilder,
  ) {}

  assetDetails(asset: Asset, allowDelete: boolean): AssetDetailDialogData {
    const propertyGridGroups = [
      this.assetPropertyGridGroupBuilder.buildAssetPropertiesGroup(asset, null),
      this.assetPropertyGridGroupBuilder.buildAdditionalPropertiesGroup(asset),
    ].filter((it) => it.properties.length);

    return {
      type: 'asset-details',
      asset,
      showDeleteButton: allowDelete,
      propertyGridGroups,
    };
  }

  contractOfferDetails(contractOffer: UiContractOffer): AssetDetailDialogData {
    let contractPolicy = contractOffer.policy;

    const propertyGridGroups = [
      this.assetPropertyGridGroupBuilder.buildAssetPropertiesGroup(asset, null),
      this.assetPropertyGridGroupBuilder.buildAdditionalPropertiesGroup(asset),
      this.assetPropertyGridGroupBuilder.buildPolicyGroup(
        asset,
        contractPolicy,
      ),
    ].filter((it) => it.properties.length);

    return {
      type: 'contract-offer',
      asset: contractOffer.asset,
      contractOffer,
      propertyGridGroups,
    };
  }

  contractAgreementDetails(
    contractAgreement: ContractAgreementCardMapped,
  ): AssetDetailDialogData {
    let asset = contractAgreement.asset;
    let contractPolicy = JSON.parse(
      contractAgreement.contractPolicy.policyJsonLd,
    );

    const propertyGridGroups = [
      this.assetPropertyGridGroupBuilder.buildContractAgreementGroup(
        contractAgreement,
      ),
      this.assetPropertyGridGroupBuilder.buildPolicyGroup(
        asset,
        contractPolicy,
      ),
      this.assetPropertyGridGroupBuilder.buildAssetPropertiesGroup(
        asset,
        'Asset',
      ),
      this.assetPropertyGridGroupBuilder.buildAdditionalPropertiesGroup(asset),
    ].filter((it) => it.properties.length);

    return {
      type: 'contract-agreement',
      asset: contractAgreement.asset,
      contractAgreement,
      propertyGridGroups,
    };
  }

  brokerDataOfferDetails(dataOffer: BrokerDataOffer): AssetDetailDialogData {
    let asset = dataOffer.asset;

    const propertyGridGroups = [
      this.assetPropertyGridGroupBuilder.buildBrokerDataOfferGroup(dataOffer),
      this.assetPropertyGridGroupBuilder.buildAssetPropertiesGroup(
        asset,
        'Asset',
      ),
      this.assetPropertyGridGroupBuilder.buildAdditionalPropertiesGroup(asset),
      ...dataOffer.contractOffers.map((contractOffer, i) =>
        this.assetPropertyGridGroupBuilder.buildContractOfferGroup(
          asset,
          contractOffer,
          i,
          dataOffer.contractOffers.length,
        ),
      ),
    ].filter((it) => it.properties.length);

    return {
      type: 'broker-data-offer',
      asset: dataOffer.asset,
      brokerDataOffer: dataOffer,
      propertyGridGroups,
    };
  }
}
