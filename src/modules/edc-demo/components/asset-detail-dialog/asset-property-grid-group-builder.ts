import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActiveFeatureSet} from '../../../app/config/active-feature-set';
import {Policy} from '../../../edc-dmgmt-client';
import {Asset} from '../../models/asset';
import {JsonDialogComponent} from '../json-dialog/json-dialog.component';
import {JsonDialogData} from '../json-dialog/json-dialog.data';
import {PropertyGridGroup} from '../property-grid-group/property-grid-group';
import {PropertyGridUtils} from '../property-grid/property-grid-utils';

@Injectable()
export class AssetPropertyGridGroupBuilder {
  constructor(
    private matDialog: MatDialog,
    private activeFeatureSet: ActiveFeatureSet,
    private propertyGridUtils: PropertyGridUtils,
  ) {}

  onPolicyClick(policyDetails: Policy) {
    const data: JsonDialogData = {
      title: 'Policy Details',
      subtitle: 'Policy',
      icon: 'policy',
      objectForJson: policyDetails,
    };
    this.matDialog.open(JsonDialogComponent, {data});
  }

  buildPropertyGridGroups(
    asset: Asset,
    policy: Policy | undefined,
  ): PropertyGridGroup[] {
    let fieldGroups: PropertyGridGroup[] = [
      {
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
    if (this.activeFeatureSet.hasMdsFields()) {
      fieldGroups.push({
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
    }

    if (asset.additionalProperties.length) {
      fieldGroups.push({
        groupLabel: 'Additional Properties',
        properties: asset.additionalProperties.map((prop) => {
          return {
            icon: 'widgets',
            label: prop.key,
            ...this.propertyGridUtils.guessValue(prop.value),
          };
        }),
      });
    }

    if (policy) {
      fieldGroups.push({
        groupLabel: 'Policy',
        properties: [
          {
            icon: 'policy',
            label: 'Contract Policy',
            text: 'Show Details',
            onclick: () => this.onPolicyClick(policy),
          },
        ],
      });
    }
    return fieldGroups;
  }
}
