import {DataOfferCreationRequest, IdResponseDto} from '@sovity.de/edc-client';
import {createAsset} from './asset-fake-service';
import {createPolicyDefinitionV2} from './policy-definition-fake-service';

export const createDataOffer = (
  request: DataOfferCreationRequest,
): IdResponseDto => {
  createAsset(request.uiAssetCreateRequest);
  createPolicyDefinitionV2({
    policyDefinitionId: request.policy,
    expression: request.uiPolicyExpression!,
  });
  //   createContractDefinition();

  return {id: 'test-id', lastUpdatedDate: new Date()};
};
