import {Injectable} from '@angular/core';
import {ActiveFeatureSet} from '../../app/config/active-feature-set';
import {AppConfigService} from '../../app/config/app-config.service';
import {AssetEditorDialogFormValue} from '../components/asset-editor-dialog/asset-editor-dialog-form-model';
import {DataCategorySelectItemService} from '../components/data-category-select/data-category-select-item.service';
import {
  DataSubcategorySelectItemService
} from '../components/data-subcategory-select/data-subcategory-select-item.service';
import {LanguageSelectItemService} from '../components/language-select/language-select-item.service';
import {TransportModeSelectItemService} from '../components/transport-mode-select/transport-mode-select-item.service';
import {AssetWithAdditionalAssetProperties} from '../models/asset-with-additional-asset-properties';
import {removeNullValues} from '../utils/record-utils';
import {trimmedOrNull} from '../utils/string-utils';
import {AssetProperties} from './asset-properties';


/**
 * Maps between EDC Asset and our type safe asset
 */
@Injectable({
  providedIn: 'root',
})
export class AssetPropertyMapper {
  constructor(
    private languageSelectItemService: LanguageSelectItemService,
    private transportModeSelectItemService: TransportModeSelectItemService,
    private dataCategorySelectItemService: DataCategorySelectItemService,
    private dataSubcategorySelectItemService: DataSubcategorySelectItemService,
    private appConfigService: AppConfigService,
    private activeFeatureSet: ActiveFeatureSet,
  ) {
  }

  readProperties(props: Record<string, string | null>): AssetWithAdditionalAssetProperties {
    const language = props[AssetProperties.sovityPropertyType.language]
      ? this.languageSelectItemService.findById(
        props[AssetProperties.sovityPropertyType.language]!,
      )
      : null;
    const dataCategory = props[AssetProperties.mdsPropertyType.dataCategory]
      ? this.dataCategorySelectItemService.findById(
        props[AssetProperties.mdsPropertyType.dataCategory]!,
      )
      : null;
    const dataSubcategory = props[AssetProperties.mdsPropertyType.dataSubcategory]
      ? this.dataSubcategorySelectItemService.findById(
        props[AssetProperties.mdsPropertyType.dataSubcategory]!,
      )
      : null;
    const transportMode = props[AssetProperties.mdsPropertyType.transportMode]
      ? this.transportModeSelectItemService.findById(
        props[AssetProperties.mdsPropertyType.transportMode]!,
      )
      : null;
    const keywords = (props[AssetProperties.sovityPropertyType.keywords] ?? '')
      .split(',')
      .map((it) => it.trim())
      .filter((it) => it);

    const id = props[AssetProperties.edcPropertyType.id] ?? 'no-id-was-set';

    const validAssetEntryTypes = Object.values({...AssetProperties.edcPropertyType, ...AssetProperties.sovityPropertyType, ...AssetProperties.mdsPropertyType})


    const additionalAssetEntries = Object.entries(props)
      .reduce((c, [k, v]) =>
        Object.assign(c, validAssetEntryTypes.includes(k) ? [] : {[k]: v}), {});

    console.log('the additional elements are ' + Object.entries({
      id,
      name: props[AssetProperties.edcPropertyType.name] ?? id,
      version: props[AssetProperties.edcPropertyType.version],
      contentType: props[AssetProperties.edcPropertyType.contentType],
      originator: props[AssetProperties.edcPropertyType.originator],
      originatorOrganization:
        props[AssetProperties.sovityPropertyType.curatorOrganizationName] ??
        props[AssetProperties._legacyCuratorOrganizationName] ?? 'Unknown Organization',
      keywords,
      description: props[AssetProperties.edcPropertyType.description],
      language,
      publisher: props[AssetProperties.sovityPropertyType.publisher],
      standardLicense: props[AssetProperties.sovityPropertyType.standardLicense],
      endpointDocumentation: props[AssetProperties.sovityPropertyType.endpointDocumentation],
      dataCategory,
      dataSubcategory,
      dataModel: props[AssetProperties.mdsPropertyType.dataModel],
      geoReferenceMethod: props[AssetProperties.mdsPropertyType.geoReferenceMethod],
      transportMode,
      additionalAssetEntries: additionalAssetEntries
    }))
    return {
      id,
      name: props[AssetProperties.edcPropertyType.name] ?? id,
      version: props[AssetProperties.edcPropertyType.version],
      contentType: props[AssetProperties.edcPropertyType.contentType],
      originator: props[AssetProperties.edcPropertyType.originator],
      originatorOrganization:
        props[AssetProperties.sovityPropertyType.curatorOrganizationName] ??
        props[AssetProperties._legacyCuratorOrganizationName] ?? 'Unknown Organization',
      keywords,
      description: props[AssetProperties.edcPropertyType.description],
      language,
      publisher: props[AssetProperties.sovityPropertyType.publisher],
      standardLicense: props[AssetProperties.sovityPropertyType.standardLicense],
      endpointDocumentation: props[AssetProperties.sovityPropertyType.endpointDocumentation],
      dataCategory,
      dataSubcategory,
      dataModel: props[AssetProperties.mdsPropertyType.dataModel],
      geoReferenceMethod: props[AssetProperties.mdsPropertyType.geoReferenceMethod],
      transportMode,
      additionalAssetEntries: additionalAssetEntries
    };
  }

  buildProperties(
    formValue: AssetEditorDialogFormValue,
  ): Record<string, string> {
    const {metadata, advanced, datasource} = formValue;
    const props: Record<string, string | null> = {};
    props[AssetProperties.edcPropertyType.id] = trimmedOrNull(metadata?.id);
    props[AssetProperties.edcPropertyType.name] = trimmedOrNull(metadata?.name);
    props[AssetProperties.edcPropertyType.version] = trimmedOrNull(metadata?.version);
    props[AssetProperties.edcPropertyType.originator] = trimmedOrNull(
      this.appConfigService.config.connectorEndpoint,
    );
    props[AssetProperties.sovityPropertyType.curatorOrganizationName] = trimmedOrNull(
      this.appConfigService.config.curatorOrganizationName,
    );
    props[AssetProperties.sovityPropertyType.keywords] = trimmedOrNull(
      metadata?.keywords?.join(', '),
    );
    props[AssetProperties.edcPropertyType.contentType] = trimmedOrNull(metadata?.contentType);
    props[AssetProperties.edcPropertyType.description] = trimmedOrNull(metadata?.description);
    props[AssetProperties.sovityPropertyType.language] = metadata?.language?.id ?? null;

    props[AssetProperties.sovityPropertyType.publisher] = trimmedOrNull(datasource?.publisher);
    props[AssetProperties.sovityPropertyType.standardLicense] = trimmedOrNull(
      datasource?.standardLicense,
    );
    props[AssetProperties.sovityPropertyType.endpointDocumentation] = trimmedOrNull(
      datasource?.endpointDocumentation,
    );

    if (this.activeFeatureSet.hasMdsFields()) {
      props[AssetProperties.mdsPropertyType.dataCategory] = advanced?.dataCategory?.id ?? null;
      props[AssetProperties.mdsPropertyType.dataSubcategory] =
        advanced?.dataSubcategory?.id ?? null;
      props[AssetProperties.mdsPropertyType.dataModel] = trimmedOrNull(advanced?.dataModel);
      props[AssetProperties.mdsPropertyType.geoReferenceMethod] = trimmedOrNull(
        advanced?.geoReferenceMethod,
      );
      props[AssetProperties.mdsPropertyType.transportMode] =
        advanced?.transportMode?.id ?? null;
    }
    return removeNullValues(props);
  }
}
