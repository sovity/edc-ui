import {Injectable} from '@angular/core';
import {UiAssetMapped} from 'src/app/core/services/models/ui-asset-mapped';
import {LanguageSelectItemService} from 'src/app/routes/connector-ui/asset-page/language-select/language-select-item.service';
import {AssetDatasourceFormValue} from './model/asset-datasource-form-model';
import {EditAssetFormValue} from './model/edit-asset-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class EditAssetFormInitializer {
  constructor(private languageSelectItemService: LanguageSelectItemService) {}

  forCreate(): EditAssetFormValue {
    return {
      mode: 'CREATE',
      general: {
        id: '',
        name: '',
        description: '',
        keywords: [],
        dataCategory: null,
        dataSubcategory: null,
        version: '',
        contentType: '',
        language: this.languageSelectItemService.english(),
        publisher: '',
        standardLicense: '',
        endpointDocumentation: '',
      },
      advanced: {
        dataModel: '',
        transportMode: null,
        geoReferenceMethod: '',
        conditionsForUse: '',
        dataUpdateFrequency: '',
        sovereignLegalName: '',
        geoLocation: '',
        nutsLocations: [],
        dataSampleUrls: [],
        referenceFileUrls: [],
        referenceFilesDescription: '',
        temporalCoverage: {from: null, toInclusive: null},
      },
      datasource: this.onRequestDatasource(),
    };
  }

  forEdit(asset: UiAssetMapped): EditAssetFormValue {
    return {
      mode: 'EDIT',
      general: {
        id: asset.assetId,
        name: asset.title,
        description: asset.description,
        keywords: asset.keywords,
        dataCategory: asset.dataCategory,
        dataSubcategory: asset.dataSubcategory,
      },
    };
  }

  private onRequestDatasource(): AssetDatasourceFormValue {
    return {
      datasourceType: 'On-Request',
      contactEmail: '',
      contactPreferredEmailSubject: '',

      dataAddressType: 'Http',
      dataDestination: '',

      httpUrl: '',
      httpMethod: 'GET',
      httpAuthHeaderType: 'None',
      httpAuthHeaderName: '',
      httpAuthHeaderValue: '',
      httpAuthHeaderSecretName: '',
      httpQueryParams: [],

      httpDefaultPath: '',
      httpProxyMethod: false,
      httpProxyPath: false,
      httpProxyQueryParams: false,
      httpProxyBody: false,

      httpHeaders: [],
    };
  }
}
