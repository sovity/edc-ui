import {Injectable} from '@angular/core';
import {UiAsset} from '@sovity.de/edc-client';
import {DataCategorySelectItemService} from '../../routes/connector-ui/asset-page/data-category-select/data-category-select-item.service';
import {DataSubcategorySelectItemService} from '../../routes/connector-ui/asset-page/data-subcategory-select/data-subcategory-select-item.service';
import {LanguageSelectItemService} from '../../routes/connector-ui/asset-page/language-select/language-select-item.service';
import {TransportModeSelectItemService} from '../../routes/connector-ui/asset-page/transport-mode-select/transport-mode-select-item.service';
import {AdditionalAssetProperty, Asset} from './models/asset';

/**
 * Maps between EDC Asset and our type safe asset
 */
@Injectable({
  providedIn: 'root',
})
export class AssetBuilder {
  constructor(
    private languageSelectItemService: LanguageSelectItemService,
    private transportModeSelectItemService: TransportModeSelectItemService,
    private dataCategorySelectItemService: DataCategorySelectItemService,
    private dataSubcategorySelectItemService: DataSubcategorySelectItemService,
  ) {}

  buildAsset(asset: UiAsset): Asset {
    const {
      additionalProperties,
      additionalJsonProperties,
      privateProperties,
      privateJsonProperties,
      language,
      dataCategory,
      dataSubcategory,
      transportMode,
      ...assetProperties
    } = asset;
    return {
      ...assetProperties,
      language: this.getLanguageItem(language),
      dataCategory: this.getDataCategoryItem(dataCategory),
      dataSubcategory: this.getDataSubcategoryItem(dataSubcategory),
      transportMode: this.getTransportModeItem(transportMode),
      mergedAdditionalProperties: this.buildAdditionalProperties(asset),
    };
  }

  private getTransportModeItem(transportMode: string | undefined) {
    return transportMode == null
      ? null
      : this.transportModeSelectItemService.findById(transportMode);
  }

  private getDataSubcategoryItem(dataSubcategory: string | undefined) {
    return dataSubcategory == null
      ? null
      : this.dataSubcategorySelectItemService.findById(dataSubcategory);
  }

  private getDataCategoryItem(dataCategory: string | undefined) {
    return dataCategory == null
      ? null
      : this.dataCategorySelectItemService.findById(dataCategory);
  }

  private getLanguageItem(language: string | undefined) {
    return language == null
      ? null
      : this.languageSelectItemService.findById(language);
  }

  private buildAdditionalProperties(asset: UiAsset): AdditionalAssetProperty[] {
    let result: AdditionalAssetProperty[] = [];
    type AssetKey =
      | 'additionalProperties'
      | 'additionalJsonProperties'
      | 'privateProperties'
      | 'privateJsonProperties';

    const propertiesToConvert: AssetKey[] = [
      'additionalProperties',
      'additionalJsonProperties',
      'privateProperties',
      'privateJsonProperties',
    ];

    for (let propName of propertiesToConvert) {
      const propValue = asset[propName];
      if (propValue) {
        for (let key in propValue) {
          result.push({key: key, value: propValue[key]});
        }
      }
    }
    return result;
  }
}
