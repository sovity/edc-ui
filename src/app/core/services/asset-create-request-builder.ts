import {Injectable} from '@angular/core';
import {UiAssetCreateRequest} from '@sovity.de/edc-client';
import {AssetEditorDialogFormValue} from '../../routes/connector-ui/asset-page/asset-create-dialog/asset-editor-dialog-form-model';
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
    let id = formValue.metadata?.id!;
    let title = formValue.metadata?.title!;
    let version = formValue.metadata?.version;
    let description = formValue.metadata?.description;
    let language = formValue.metadata?.language?.id;
    let keywords = formValue.metadata?.keywords;
    let licenseUrl = formValue.metadata?.standardLicense;
    let publisherHomepage = formValue.metadata?.publisher;
    let mediaType = formValue.metadata?.contentType;
    let landingPageUrl = formValue.metadata?.endpointDocumentation;

    let dataCategory = formValue.advanced?.dataModel;
    let dataSubcategory = formValue.advanced?.dataSubcategory?.id;
    let transportMode = formValue.advanced?.transportMode?.id;
    let geoReferenceMethod = formValue.advanced?.geoReferenceMethod;
    let dataModel = formValue.advanced?.dataModel;

    const dataAddressProperties =
      this.dataAddressMapper.buildDataAddressProperties(formValue.datasource);
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
      dataAddressProperties,
    };
  }
}
