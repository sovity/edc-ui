import {Injectable} from '@angular/core';
import {AssetCreateFormValue} from './model/asset-create-form-model';

/**
 * Handles AngularForms for Create Asset Form
 */
@Injectable()
export class AssetCreateFormInitializer {
  constructor() {}

  forCreate(): AssetCreateFormValue {
    return {
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
}
