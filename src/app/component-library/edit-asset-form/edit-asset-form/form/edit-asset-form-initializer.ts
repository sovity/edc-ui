import {Injectable} from '@angular/core';
import {UiAssetMapped} from 'src/app/core/services/models/ui-asset-mapped';
import {AssetDatasourceFormValue} from './model/asset-datasource-form-model';
import {EditAssetFormValue} from './model/edit-asset-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class EditAssetFormInitializer {
  constructor() {}

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
      },
      datasource: this.emptyHttpDatasource(),
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

  private emptyHttpDatasource(): AssetDatasourceFormValue {
    return {
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
