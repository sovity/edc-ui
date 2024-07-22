import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActiveFeatureSet} from 'src/app/core/config/active-feature-set';
import {DataCategorySelectItem} from '../../data-category-select/data-category-select-item';
import {AssetAdvancedFormBuilder} from './asset-advanced-form-builder';
import {AssetDatasourceFormBuilder} from './asset-datasource-form-builder';
import {AssetGeneralFormBuilder} from './asset-general-form-builder';
import {AssetAdvancedFormModel} from './model/asset-advanced-form-model';
import {AssetDatasourceFormModel} from './model/asset-datasource-form-model';
import {AssetEditDialogMode} from './model/asset-edit-dialog-mode';
import {AssetGeneralFormModel} from './model/asset-general-form-model';
import {DataAddress} from './model/data-address';
import {
  EditAssetFormModel,
  EditAssetFormValue,
} from './model/edit-asset-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class EditAssetForm {
  all!: FormGroup<EditAssetFormModel>;

  general!: EditAssetFormModel['general'];

  datasource!: EditAssetFormModel['datasource'];

  advanced!: EditAssetFormModel['advanced'];

  get value(): EditAssetFormValue {
    return this.all.value;
  }

  get mode(): AssetEditDialogMode {
    return this.all.controls.mode.value;
  }

  get dataAddressType(): DataAddress | null {
    return this.datasource!.controls.dataAddressType.value;
  }

  get dataCategory(): DataCategorySelectItem | null {
    return this.general.controls.dataCategory!.value;
  }

  get proxyMethod(): boolean {
    return this.datasource!.controls.httpProxyMethod.value;
  }

  get proxyPath(): boolean {
    return this.datasource!.controls.httpProxyPath.value;
  }

  get proxyQueryParams(): boolean {
    return this.datasource!.controls.httpProxyQueryParams.value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private assetGeneralFormBuilder: AssetGeneralFormBuilder,
    private assetDatasourceFormBuilder: AssetDatasourceFormBuilder,
    private assetAdvancedFormBuilder: AssetAdvancedFormBuilder,
    private activeFeatureSet: ActiveFeatureSet,
  ) {}

  reset(initial: EditAssetFormValue) {
    this.all = this.buildFormGroup(initial);
    this.general = this.all.controls.general;
    this.datasource = this.all.controls.datasource;
    this.advanced = this.all.controls.advanced;
  }

  buildFormGroup(initial: EditAssetFormValue): FormGroup<EditAssetFormModel> {
    const general: FormGroup<AssetGeneralFormModel> =
      this.assetGeneralFormBuilder.buildFormGroup(
        initial.general!,
        initial.mode!,
      );

    const formGroup: FormGroup<EditAssetFormModel> =
      this.formBuilder.nonNullable.group({
        mode: [initial.mode as AssetEditDialogMode],
        general,
      });

    if (this.activeFeatureSet.hasMdsFields()) {
      const advanced: FormGroup<AssetAdvancedFormModel> =
        this.assetAdvancedFormBuilder.buildFormGroup(initial.advanced!);
      formGroup.addControl('advanced', advanced);
    }

    if (initial.mode !== 'EDIT') {
      const datasource: FormGroup<AssetDatasourceFormModel> =
        this.assetDatasourceFormBuilder.buildFormGroup(initial.datasource!);
      formGroup.addControl('datasource', datasource);
    }

    return formGroup;
  }

  onHttpHeadersAddClick(buttonClickedEvent: Event) {
    buttonClickedEvent.preventDefault();
    this.datasource!.controls.httpHeaders.push(
      this.assetDatasourceFormBuilder.buildHeaderFormGroup({
        headerName: '',
        headerValue: '',
      }),
    );
  }

  onHttpHeadersRemoveClick(buttonClickedEvent: Event, index: number) {
    buttonClickedEvent.preventDefault();
    this.datasource!.controls.httpHeaders.removeAt(index);
  }

  onHttpQueryParamsAddClick(buttonClickedEvent: Event) {
    buttonClickedEvent.preventDefault();
    this.datasource!.controls.httpQueryParams.push(
      this.assetDatasourceFormBuilder.buildQueryParamFormGroup({
        paramName: '',
        paramValue: '',
      }),
    );
  }

  // markAllAsTouched added as a workaround to get labels outside of mat-form-field to show invalid state correctly
  onHttpQueryParamsRemoveClick(buttonClickedEvent: Event, index: number) {
    buttonClickedEvent.preventDefault();
    this.datasource!.controls.httpQueryParams.removeAt(index);
  }

  onNutsLocationsAddClick(buttonClickedEvent: Event) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.nutsLocations.push(
      this.assetAdvancedFormBuilder.buildRequiredString(''),
    );
  }

  onNutsLocationsRemoveClick(buttonClickedEvent: Event, index: number) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.nutsLocations.removeAt(index);
  }

  onDataSampleUrlsAddClick(buttonClickedEvent: Event) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.dataSampleUrls.push(
      this.assetAdvancedFormBuilder.buildRequiredUrl(''),
    );
  }

  onDataSampleUrlsRemoveClick(buttonClickedEvent: Event, index: number) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.dataSampleUrls.removeAt(index);
  }

  onReferenceFileUrlsAddClick(buttonClickedEvent: Event) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.referenceFileUrls.push(
      this.assetAdvancedFormBuilder.buildRequiredUrl(''),
    );
  }

  onReferenceFileUrlsRemoveClick(buttonClickedEvent: Event, index: number) {
    buttonClickedEvent.preventDefault();
    this.advanced!.controls.referenceFileUrls.removeAt(index);
  }
}
