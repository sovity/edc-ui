import {Injectable} from '@angular/core';
import {
  ContractDefinitionRequest,
  UiCriterionLiteralType,
} from '@sovity.de/edc-client';
import {DataOfferEditorDialogFormValue} from '../../routes/connector-ui/data-offers-page/data-offer-editor-dialog/data-offer-editor-dialog-form-model';
import {AssetProperty} from './models/asset-properties';

@Injectable({
  providedIn: 'root',
})
export class ContractDefinitionBuilder {
  /**
   * Build {@link ContractDefinitionDto} from {@link ContractDefinitionEditorDialogFormValue}
   *
   * @param formValue form value
   * @return contract definition dto
   */
  buildContractDefinition(
    formValue: DataOfferEditorDialogFormValue,
  ): ContractDefinitionRequest {
    return {
      contractDefinitionId: formValue.id ?? '',
      accessPolicyId: formValue.accessPolicy!.policyDefinitionId,
      contractPolicyId: formValue.contractPolicy!.policyDefinitionId,
      assetSelector: [
        {
          operandLeft: AssetProperty.id,
          operator: 'IN',
          operandRight: {
            type: UiCriterionLiteralType.ValueList,
            valueList: formValue.assets!.map((it) => it.assetId),
          },
        },
      ],
    };
  }
}
