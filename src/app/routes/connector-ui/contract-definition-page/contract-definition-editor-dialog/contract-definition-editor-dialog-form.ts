import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PolicyDefinitionDto} from '@sovity.de/edc-client';
import {EditAssetFormValidators} from 'src/app/component-library/edit-asset-form/edit-asset-form/form/edit-asset-form-validators';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';
import {noWhitespacesOrColonsValidator} from '../../../../core/validators/no-whitespaces-or-colons-validator';
import {
  ContractDefinitionEditorDialogFormModel,
  ContractDefinitionEditorDialogFormValue,
} from './contract-definition-editor-dialog-form-model';

/**
 * Handles AngularForms for ContractDefinitionEditorDialog
 */
@Injectable()
export class ContractDefinitionEditorDialogForm {
  group = this.buildFormGroup();

  /**
   * Quick access to full value
   */
  get value(): ContractDefinitionEditorDialogFormValue {
    return this.group.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private validators: EditAssetFormValidators,
  ) {}

  buildFormGroup(): FormGroup<ContractDefinitionEditorDialogFormModel> {
    return this.formBuilder.nonNullable.group({
      id: [
        '',
        [Validators.required, noWhitespacesOrColonsValidator],
        [this.validators.isValidDataOfferId()],
      ],
      accessPolicy: [null as PolicyDefinitionDto | null, Validators.required],
      contractPolicy: [null as PolicyDefinitionDto | null, Validators.required],
      assets: [[] as UiAssetMapped[], Validators.required],
    });
  }
}
