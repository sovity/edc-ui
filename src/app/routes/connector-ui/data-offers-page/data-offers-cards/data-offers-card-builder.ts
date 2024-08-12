import {Injectable} from '@angular/core';
import {
  ContractDefinitionEntry,
  ContractDefinitionPage as DataOffersPage,
  PolicyDefinitionDto,
  UiCriterion,
} from '@sovity.de/edc-client';
import {CRITERION_OPERATOR_SYMBOLS} from '../../../../core/services/api/model/criterion-type-ext';
import {AssetProperty} from '../../../../core/services/models/asset-properties';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';
import {associateBy} from '../../../../core/utils/map-utils';
import {assetSearchTargets} from '../../../../core/utils/search-utils';
import {
  DataOfferCard,
  DataOfferCardCriterionValue,
  DataOfferCardPolicy,
} from './data-offer-card';

@Injectable({providedIn: 'root'})
export class DataOffersCardBuilder {
  buildDataOffersCards(
    dataOffersPage: DataOffersPage,
    assets: UiAssetMapped[],
    policyDefinitions: PolicyDefinitionDto[],
  ): DataOfferCard[] {
    const assetById = associateBy(assets, (asset) => asset.assetId);
    const policyDefinitionById = associateBy(
      policyDefinitions,
      (policyDefinition) => policyDefinition.policyDefinitionId,
    );

    return dataOffersPage.contractDefinitions.map((contractDefinition) =>
      this.buildDataOfferCard(
        contractDefinition,
        assetById,
        policyDefinitionById,
      ),
    );
  }

  buildDataOfferCard(
    contractDefinition: ContractDefinitionEntry,
    assetById: Map<string, UiAssetMapped>,
    policyDefinitionById: Map<string, PolicyDefinitionDto>,
  ): DataOfferCard {
    return {
      id: contractDefinition.contractDefinitionId,
      contractPolicy: this.extractPolicy(
        contractDefinition.contractPolicyId,
        policyDefinitionById,
      ),
      accessPolicy: this.extractPolicy(
        contractDefinition.accessPolicyId,
        policyDefinitionById,
      ),

      criteria: contractDefinition.assetSelector.map((criterion) => ({
        label: this.extractCriterionOperation(criterion),
        values: this.extractCriterionValues(criterion, assetById),
      })),
      detailJsonObj: contractDefinition,
    };
  }

  private extractPolicy(
    policyDefinitionId: string,
    policyDefinitionsById: Map<string, PolicyDefinitionDto>,
  ): DataOfferCardPolicy {
    return {
      policyDefinitionId: policyDefinitionId,
      policyDefinition: policyDefinitionsById.get(policyDefinitionId) || null,
    };
  }

  private extractCriterionOperation(criterion: UiCriterion): string {
    const {operandLeft, operator} = criterion;
    if (
      operandLeft === AssetProperty.id &&
      (operator === 'EQ' || operator === 'IN')
    ) {
      return 'Assets';
    }

    const operatorStr = CRITERION_OPERATOR_SYMBOLS[operator] ?? operator;
    return `${operandLeft} ${operatorStr}`;
  }

  private extractCriterionValues(
    criterion: UiCriterion,
    assetsById: Map<string, UiAssetMapped>,
  ): DataOfferCardCriterionValue[] {
    const {operandLeft, operandRight} = criterion;

    let values: string[] = [];
    if (operandRight.type === 'VALUE_LIST') {
      values = operandRight.valueList ?? [];
    } else {
      values = [operandRight.value!!];
    }

    return values.map((it) => {
      const stringType: DataOfferCardCriterionValue = {
        type: 'string',
        value: it,
        searchTargets: [it],
      };

      // Try to find asset
      if (operandLeft === AssetProperty.id) {
        const asset = assetsById.get(it);
        if (asset) {
          return {
            type: 'asset',
            asset,
            searchTargets: assetSearchTargets(asset),
          };
        }

        return stringType;
      }

      return stringType;
    });
  }
}
