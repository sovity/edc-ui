import {Injectable} from '@angular/core';
import {
  ContractDefinitionRequest as DataOfferRequest,
  UiCriterionLiteralType,
} from '@sovity.de/edc-client';
import {DataOfferEditorDialogFormValue} from '../../routes/connector-ui/data-offers-page/data-offer-editor-dialog/data-offer-editor-dialog-form-model';
import {AssetProperty} from './models/asset-properties';

@Injectable({
  providedIn: 'root',
})
export class DataOfferBuilder {
  /**
   * Build {@link DataOfferDto} from {@link DataOfferEditorDialogFormValue}
   *
   * @param formValue form value
   * @return data offer dto
   */
  buildDataOffer(formValue: DataOfferEditorDialogFormValue): DataOfferRequest {
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
