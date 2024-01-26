import {Injectable} from '@angular/core';
import {
  UiAssetCreateRequest,
  UiAssetEditMetadataRequest,
} from '@sovity.de/edc-client';
import {format} from 'date-fns-tz';
import {AssetEditorDialogFormValue} from '../../routes/connector-ui/asset-page/asset-edit-dialog/form/model/asset-editor-dialog-form-model';
import {DataAddressMapper} from './data-address-mapper';

@Injectable()
export class AssetCreateRequestBuilder {
  constructor(private dataAddressMapper: DataAddressMapper) {}

  /**
   * Build {@link UiAssetCreateRequest} from {@link AssetEditorDialogFormValue}
   *
   * @param formValue form value
   * @return {@link UiAssetCreateRequest}
   */
  buildAssetCreateRequest(
    formValue: AssetEditorDialogFormValue,
  ): UiAssetCreateRequest {
    const id = formValue.metadata?.id!;
    const metadata = this.buildEditMetadataRequest(formValue);
    const dataAddressProperties =
      this.dataAddressMapper.buildDataAddressProperties(formValue.datasource);

    return {
      id,
      ...metadata,
      dataAddressProperties,
    };
  }

  /**
   * Build {@link UiAssetEditMetadataRequest} from {@link AssetEditorDialogFormValue}
   *
   * @param formValue form value
   * @return {@link UiAssetEditMetadataRequest}
   */
  buildEditMetadataRequest(
    formValue: AssetEditorDialogFormValue,
  ): UiAssetEditMetadataRequest {
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

    const sovereignLegalName = formValue.advanced?.sovereignLegalName;
    const geoLocation = formValue.advanced?.geoLocation;
    const nutsLocations = formValue.advanced?.nutsLocations;
    const dataSampleUrls = formValue.advanced?.dataSampleUrls;
    const referenceFileUrls = formValue.advanced?.referenceFileUrls;
    const referenceFilesDescription =
      formValue.advanced?.referenceFilesDescription;
    const conditionsForUse = formValue.advanced?.conditionsForUse;
    const dataUpdateFrequency = formValue.advanced?.dataUpdateFrequency;
    let temporalCoverageFrom =
      formValue.advanced?.temporalCoverage?.from || undefined;
    let temporalCoverageToInclusive =
      formValue.advanced?.temporalCoverage?.toInclusive || undefined;
    /*
     * We dont care about hours, we just want the date to be displayed identically in all timezones.
     * For requests the hour context is lost (in both directions) as the api clients just convert the date to
     * a field like this temporalCoverageFrom: "2024-01-01".
     * The date string is then parsed into a date object again assuming UTC
     * Therefore to display dates identically in all timezones we convert the date picked (which contains hour
     * information as per timezone) to a GMT date at hour 0 here.
     * This results to dates being displayed identically in all timezones.
     */
    temporalCoverageFrom = temporalCoverageFrom
      ? new Date(format(temporalCoverageFrom, 'yyyy-MM-dd'))
      : undefined;
    temporalCoverageToInclusive = temporalCoverageToInclusive
      ? new Date(format(temporalCoverageToInclusive, 'yyyy-MM-dd'))
      : undefined;

    return {
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
      sovereignLegalName,
      geoLocation,
      nutsLocation: nutsLocations,
      dataSampleUrls,
      referenceFileUrls,
      referenceFilesDescription,
      conditionsForUse,
      dataUpdateFrequency,
      temporalCoverageFrom,
      temporalCoverageToInclusive,
    };
  }
}
