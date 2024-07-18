import {Injectable} from '@angular/core';
import {UiAssetMapped} from 'src/app/core/services/models/ui-asset-mapped';
import {AssetCreateFormValue} from './model/asset-create-form-model';

/**
 * Handles AngularForms for Edit Asset Form
 */
@Injectable()
export class AssetCreateFormInitializer {
  constructor() {}

  forCreate(): AssetCreateFormValue {
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
    };
  }

  forEdit(asset: UiAssetMapped): AssetCreateFormValue {
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
}
