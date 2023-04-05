import {Injectable} from '@angular/core';
import {ActiveFeatureSet} from '../../../app/config/active-feature-set';
import {AssetWithAdditionalAssetProperties} from '../../models/asset-with-additional-asset-properties';
import {PropertyGridFieldGroup} from '../property-grid-field-group/property-grid-field-group';
import {PropertyGridUtils} from '../property-grid/property-grid-utils';

@Injectable()
export class AssetPropertyGridGroupBuilder {
  constructor(
    private activeFeatureSet: ActiveFeatureSet,
    private propertyGridUtils: PropertyGridUtils,
  ) {}

  buildPropertyGridGroups(
    asset: AssetWithAdditionalAssetProperties,
  ): PropertyGridFieldGroup[] {
    let fieldGroups: PropertyGridFieldGroup[] = [
      {
        groupLabel: 'Sovity Asset Properties',
        properties: [
          {
            icon: 'category',
            label: 'ID',
            ...this.propertyGridUtils.guessValue(asset.id),
          },
          {
            icon: 'file_copy',
            label: 'Version',
            ...this.propertyGridUtils.guessValue(asset.version),
          },
          {
            icon: 'language',
            label: 'Language',
            ...this.propertyGridUtils.guessValue(asset.language?.label),
          },

          {
            icon: 'apartment',
            label: 'Publisher',
            ...this.propertyGridUtils.guessValue(asset.publisher),
          },
          {
            icon: 'bookmarks',
            label: 'Endpoint Documentation',
            ...this.propertyGridUtils.guessValue(asset.endpointDocumentation),
          },
          {
            icon: 'gavel',
            label: 'Standard License',
            ...this.propertyGridUtils.guessValue(asset.standardLicense),
          },
          {
            icon: 'category',
            label: 'Content Type',
            ...this.propertyGridUtils.guessValue(asset.contentType),
          },

          {
            icon: 'link',
            label: 'Connector Endpoint',
            ...this.propertyGridUtils.guessValue(asset.originator),
          },
          {
            icon: 'account_circle',
            label: 'Organization',
            ...this.propertyGridUtils.guessValue(asset.originatorOrganization),
          },
        ],
      },
    ];

    // MDS Specific Fields
    fieldGroups.push({
      groupLabel: this.activeFeatureSet.hasMdsFields()
        ? 'MDS Asset Properties'
        : 'Additional Properties',
      properties: [
        {
          icon: 'commute',
          label: 'Transport Mode',
          ...this.propertyGridUtils.guessValue(asset.transportMode?.label),
        },
        {
          icon: 'commute',
          label: 'Data Category',
          ...this.propertyGridUtils.guessValue(asset.dataCategory?.label),
        },
        {
          icon: 'commute',
          label: 'Data Subcategory',
          ...this.propertyGridUtils.guessValue(asset.dataSubcategory?.label),
        },
        {
          icon: 'category',
          label: 'Data Model',
          ...this.propertyGridUtils.guessValue(asset.dataModel),
        },
      ],
    });
    if (
      !!Object.keys(asset.additionalAssetEntries).length &&
      this.activeFeatureSet.hasMdsFields()
    ) {
      fieldGroups.push({
        groupLabel: 'Additional Properties',
        properties: Object.entries(asset.additionalAssetEntries).map(
          ([key]) => {
            return {
              icon: 'widgets',
              label: key,
              ...this.propertyGridUtils.guessValue(
                asset.additionalAssetEntries[key],
              ),
            };
          },
        ),
      });
    }

    if (!!Object.keys(asset.additionalAssetEntries).length) {
      fieldGroups[
        fieldGroups.findIndex((object) => {
          return object.groupLabel === 'Additional Properties';
        })
      ].properties?.push(
        ...Object.entries(asset.additionalAssetEntries).map(([key]) => {
          return {
            icon: 'widgets',
            label: key,
            ...this.propertyGridUtils.guessValue(
              asset.additionalAssetEntries[key],
            ),
          };
        }),
      );
    }
    return fieldGroups;
  }
}
