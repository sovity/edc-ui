import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PolicyDefinitionDto} from '@sovity.de/edc-client';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';
import {noWhitespacesOrColonsValidator} from '../../../../core/validators/no-whitespaces-or-colons-validator';
import {
  DataOfferEditorDialogFormModel,
  DataOfferEditorDialogFormValue,
} from './data-offer-editor-dialog-form-model';

/**
 * Handles AngularForms for DataOfferEditorDialog
 */
@Injectable()
export class DataOfferEditorDialogForm {
  group = this.buildFormGroup();

  /**
   * Quick access to full value
   */
  get value(): DataOfferEditorDialogFormValue {
    return this.group.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  buildFormGroup(): FormGroup<DataOfferEditorDialogFormModel> {
    return this.formBuilder.nonNullable.group({
      id: ['', [Validators.required, noWhitespacesOrColonsValidator]],
      accessPolicy: [null as PolicyDefinitionDto | null, Validators.required],
      contractPolicy: [null as PolicyDefinitionDto | null, Validators.required],
      assets: [[] as UiAssetMapped[], Validators.required],
    });
  }
}
