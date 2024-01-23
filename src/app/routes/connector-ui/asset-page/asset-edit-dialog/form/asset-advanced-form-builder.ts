import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetAdvancedFormModel} from './model/asset-advanced-form-model';
import {AssetEditorDialogFormValue} from './model/asset-editor-dialog-form-model';

@Injectable()
export class AssetAdvancedFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  buildFormGroup(
    initial: AssetEditorDialogFormValue['advanced'],
  ): FormGroup<AssetAdvancedFormModel> {
    return this.formBuilder.nonNullable.group({
      dataModel: initial?.dataModel!,
      dataCategory: [initial?.dataCategory || null, Validators.required],
      dataSubcategory: initial?.dataSubcategory || null,
      transportMode: initial?.transportMode || null,
      geoReferenceMethod: initial?.geoReferenceMethod!,
      sovereignLegalName: initial?.sovereignLegalName!,
      geoLocation: initial?.geoLocation!,
      nutsLocations: this.formBuilder.nonNullable.array(
        initial?.nutsLocations?.map((x) => this.buildRequiredString(x)) ?? [],
      ),
      dataSampleUrls: this.formBuilder.array(
        initial?.dataSampleUrls?.map((x) => this.buildRequiredString(x)) ?? [],
      ),
      referenceFileUrls: this.formBuilder.nonNullable.array(
        initial?.referenceFileUrls?.map((x) => this.buildRequiredString(x)) ??
          [],
      ),
      referenceFilesDescription: initial?.referenceFilesDescription!,
      conditionsForUse: initial?.conditionsForUse!,
      dataUpdateFrequency: initial?.dataUpdateFrequency!,
      temporalCoverageFrom: initial?.temporalCoverageFrom || null,
      temporalCoverageToInclusive: initial?.temporalCoverageToInclusive || null,
    });
  }

  buildRequiredString(initial: string): FormControl<string> {
    return this.formBuilder.nonNullable.control(initial, Validators.required);
  }
}
