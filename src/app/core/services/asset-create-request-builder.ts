import {Injectable} from '@angular/core';
import {
  UiAssetCreateRequest,
  UiAssetEditMetadataRequest,
} from '@sovity.de/edc-client';
import {AssetEditorDialogFormValue} from '../../routes/connector-ui/asset-page/asset-edit-dialog/form/model/asset-editor-dialog-form-model';
import {DataAddressMapper} from './data-address-mapper';

@Injectable()
export class AssetCreateRequestBuilder {
  constructor(private dataAddressMapper: DataAddressMapper) {}

  /**
   * Build {@link UiAssetCreateRequest} from {@link AssetEditorDialogFormValue}
   *
   * @param formValue form value
   * @return asset create dto
   */
  buildAssetCreateRequest(
    formValue: AssetEditorDialogFormValue,
  ): UiAssetCreateRequest {
    const metadata = this._metadata(formValue);
    const dataAddressProperties =
      this.dataAddressMapper.buildDataAddressProperties(formValue.datasource);

    return {
      ...metadata,
      dataAddressProperties,
    };
  }

  buildEditMetadataRequest(
    formValue: AssetEditorDialogFormValue,
  ): UiAssetEditMetadataRequest {
    const {id, ...metadata} = this._metadata(formValue);
    return metadata;
  }

  private _metadata(
    formValue: AssetEditorDialogFormValue,
  ): Omit<UiAssetCreateRequest, 'dataAddressProperties'> {
    const id = formValue.metadata?.id!;
    const title = formValue.metadata?.title!;
    const version = formValue.metadata?.version;
    const description = formValue.metadata?.description;
    const language = formValue.metadata?.language?.id;
    const keywords = formValue.metadata?.keywords;
    const licenseUrl = formValue.metadata?.standardLicense;
    const publisherHomepage = formValue.metadata?.publisher;
    const mediaType = formValue.metadata?.contentType;
    const landingPageUrl = formValue.metadata?.endpointDocumentation;

    const dataCategory = formValue.advanced?.dataCategory?.id;
    const dataSubcategory = formValue.advanced?.dataSubcategory?.id;
    const transportMode = formValue.advanced?.transportMode?.id;
    const geoReferenceMethod = formValue.advanced?.geoReferenceMethod;
    const dataModel = formValue.advanced?.dataModel;

    return {
      id,
      title,
      language,
      description,
      publisherHomepage,
      licenseUrl,
      version,
      keywords,
      mediaType,
      landingPageUrl,
      dataCategory,
      dataSubcategory,
      dataModel,
      geoReferenceMethod,
      transportMode,
    };
  }
}
