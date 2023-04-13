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
import {AdditionalAssetProperty, Asset} from '../models/asset';
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

  buildAssetFromProperties(props: Record<string, string | null>): Asset {
    const language = props[AssetProperties.language]
      ? this.languageSelectItemService.findById(
        props[AssetProperties.language]!,
      )
      : null;
    const dataCategory = props[AssetProperties.mds.dataCategory]
      ? this.dataCategorySelectItemService.findById(
        props[AssetProperties.mds.dataCategory]!,
      )
      : null;
    const dataSubcategory = props[AssetProperties.mds.dataSubcategory]
      ? this.dataSubcategorySelectItemService.findById(
        props[AssetProperties.mds.dataSubcategory]!,
      )
      : null;
    const transportMode = props[AssetProperties.mds.transportMode]
      ? this.transportModeSelectItemService.findById(
        props[AssetProperties.mds.transportMode]!,
      )
      : null;
    const keywords = (props[AssetProperties.keywords] ?? '')
      .split(',')
      .map((it) => it.trim())
      .filter((it) => it);

    const id = props[AssetProperties.id] ?? 'no-id-was-set';


    const handledAssetProperties = Object.values(AssetProperties).filter((v) => typeof v === "string")

    if (this.activeFeatureSet.hasMdsFields()) {
      handledAssetProperties.push(...Object.values(AssetProperties.mds))
    }

    const additionalProperties: AdditionalAssetProperty[] = Object.entries(props)
      .filter(([k, _]) => !handledAssetProperties.includes(k))
      .map(([key, value]) => ({
        key,
        value: value ?? '',
      }));

    return {
      id,
      name: props[AssetProperties.name] ?? id,
      version: props[AssetProperties.version],
      contentType: props[AssetProperties.contentType],
      originator: props[AssetProperties.originator],
      originatorOrganization:
        props[AssetProperties.curatorOrganizationName] ??
        props[AssetProperties._legacyCuratorOrganizationName] ?? 'Unknown Organization',
      keywords,
      description: props[AssetProperties.description],
      language,
      publisher: props[AssetProperties.publisher],
      standardLicense: props[AssetProperties.standardLicense],
      endpointDocumentation: props[AssetProperties.endpointDocumentation],
      dataCategory,
      dataSubcategory,
      dataModel: props[AssetProperties.mds.dataModel],
      geoReferenceMethod: props[AssetProperties.mds.geoReferenceMethod],
      transportMode,
      additionalProperties
    };
  }

  buildProperties(
    formValue: AssetEditorDialogFormValue,
  ): Record<string, string> {
    const {metadata, advanced, datasource} = formValue;
    const props: Record<string, string | null> = {};
    props[AssetProperties.id] = trimmedOrNull(metadata?.id);
    props[AssetProperties.name] = trimmedOrNull(metadata?.name);
    props[AssetProperties.version] = trimmedOrNull(metadata?.version);
    props[AssetProperties.originator] = trimmedOrNull(
      this.appConfigService.config.connectorEndpoint,
    );
    props[AssetProperties.curatorOrganizationName] = trimmedOrNull(
      this.appConfigService.config.curatorOrganizationName,
    );
    props[AssetProperties.keywords] = trimmedOrNull(
      metadata?.keywords?.join(', '),
    );
    props[AssetProperties.contentType] = trimmedOrNull(metadata?.contentType);
    props[AssetProperties.description] = trimmedOrNull(metadata?.description);
    props[AssetProperties.language] = metadata?.language?.id ?? null;

    props[AssetProperties.publisher] = trimmedOrNull(datasource?.publisher);
    props[AssetProperties.standardLicense] = trimmedOrNull(
      datasource?.standardLicense,
    );
    props[AssetProperties.endpointDocumentation] = trimmedOrNull(
      datasource?.endpointDocumentation,
    );

    if (this.activeFeatureSet.hasMdsFields()) {
      props[AssetProperties.mds.dataCategory] = advanced?.dataCategory?.id ?? null;
      props[AssetProperties.mds.dataSubcategory] =
        advanced?.dataSubcategory?.id ?? null;
      props[AssetProperties.mds.dataModel] = trimmedOrNull(advanced?.dataModel);
      props[AssetProperties.mds.geoReferenceMethod] = trimmedOrNull(
        advanced?.geoReferenceMethod,
      );
      props[AssetProperties.mds.transportMode] =
        advanced?.transportMode?.id ?? null;
    }
    return removeNullValues(props);
  }
}
