import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AppConfigService} from '../../../app/config/app-config.service';
import {Fetched} from '../../models/fetched';
import {LastCommitInfo} from '../../models/last-commit-info';
import {JsonDialogComponent} from '../json-dialog/json-dialog.component';
import {JsonDialogData} from '../json-dialog/json-dialog.data';
import {PropertyGridGroup} from '../property-grid-group/property-grid-group';
import {PropertyGridField} from '../property-grid/property-grid-field';
import {PropertyGridUtils} from '../property-grid/property-grid-utils';

@Injectable({providedIn: 'root'})
export class ConnectorInfoPropertyGridGroupBuilder {
  constructor(
    private matDialog: MatDialog,
    private appConfigService: AppConfigService,
    private propertyGridUtils: PropertyGridUtils,
  ) {}

  private onShowConnectorVersionClick(title: string, versionData: any) {
    const data: JsonDialogData = {
      title,
      subtitle: 'Show Details',
      icon: 'link',
      objectForJson: versionData,
    };
    this.matDialog.open(JsonDialogComponent, {data});
  }

  private asDate(dateString?: string) {
    return dateString ? new Date(dateString!).toLocaleString() : '';
  }

  buildConnectorPropertyGridGroup(
    groupLabel: string | null,
  ): PropertyGridGroup {
    const config = this.appConfigService.config;

    const fields: PropertyGridField[] = [
      {
        icon: 'link',
        label: 'Connector Endpoint',
        ...this.propertyGridUtils.guessValue(config.connectorEndpoint),
      },
      {
        icon: 'vpn_key',
        label: 'DAPS Token URL',
        ...this.propertyGridUtils.guessValue(config.dapsOauthTokenUrl),
      },
      {
        icon: 'lock',
        label: 'DAPS JWKS URL',
        ...this.propertyGridUtils.guessValue(config.dapsOauthJwksUrl),
      },
      {
        icon: 'category',
        label: 'Connector ID',
        ...this.propertyGridUtils.guessValue(config.connectorId),
      },
      {
        icon: 'category',
        label: 'Connector Name',
        ...this.propertyGridUtils.guessValue(config.connectorName),
      },
      {
        icon: 'category',
        label: 'Connector IDS ID',
        ...this.propertyGridUtils.guessValue(config.connectorIdsId),
      },
      {
        icon: 'title',
        label: 'Title',
        ...this.propertyGridUtils.guessValue(config.connectorIdsTitle),
      },
      {
        icon: 'apartment',
        label: 'Curator Organization Name',
        ...this.propertyGridUtils.guessValue(config.curatorOrganizationName),
      },
      {
        icon: 'apartment',
        label: 'Curator URL',
        ...this.propertyGridUtils.guessValue(config.curatorUrl),
      },
      {
        icon: 'title',
        label: 'Description',
        ...this.propertyGridUtils.guessValue(config.connectorIdsDescription),
      },
      {
        icon: 'contact_support',
        label: 'Maintainer Organization Name',
        ...this.propertyGridUtils.guessValue(config.maintainerOrganizationName),
      },
      {
        icon: 'contact_support',
        label: 'Maintainer URL',
        ...this.propertyGridUtils.guessValue(config.maintainerUrl),
      },
    ];

    return {
      groupLabel,
      properties: fields,
    };
  }

  buildConnectorVersionGroup(
    lastCommitInfo: Fetched<LastCommitInfo>,
    uiBuildDate: Fetched<String>,
    uiCommitDetails: Fetched<String>,
  ): PropertyGridGroup {
    let fields: PropertyGridField[] = [];
    lastCommitInfo.match({
      ifOk: (LastCommitInfo) => {
        fields = [
          {
            icon: 'link',
            label: 'Jar Version',
            text: LastCommitInfo.jarLastBuildDate
              ? this.asDate(LastCommitInfo.jarLastBuildDate)
              : 'Show Details',
            onclick: () =>
              this.onShowConnectorVersionClick('Version Information', {
                'Jar Last Commit Information': LastCommitInfo.jarLastCommitInfo,
              }),
          },
          {
            icon: 'link',
            label: 'Environment Version',
            text: LastCommitInfo.envLastBuildDate
              ? this.asDate(LastCommitInfo.envLastBuildDate)
              : 'Show Details',
            onclick: () =>
              this.onShowConnectorVersionClick('Version Information', {
                'Environment Last Commit Information':
                  LastCommitInfo.envLastCommitInfo,
              }),
          },
        ];
      },
      ifError: (error) => {
        fields = [
          {
            icon: 'link',
            label: 'Jar Version',
            text: 'Show Details',
            onclick: () =>
              this.onShowConnectorVersionClick('Version Information', {
                Error: error.failureMessage,
              }),
          },
          {
            icon: 'link',
            label: 'Jar Version',
            text: 'Show Details',
            onclick: () =>
              this.onShowConnectorVersionClick('Version Information', {
                Error: error.failureMessage,
              }),
          },
        ];
      },
      ifLoading: () => {
        fields = [
          {
            icon: 'link',
            label: 'Jar Version',
            text: 'Loading...',
          },
          {
            icon: 'link',
            label: 'Environment Version',
            text: 'Loading...',
          },
        ];
      },
    });

    uiBuildDate.match({
      ifOk: (data) => {
        fields.push({
          icon: 'link',
          label: 'UI Version',
          text: data.trim().toString()
            ? this.asDate(data.trim().toString())
            : 'Show Details',
          onclick: () =>
            this.onShowConnectorVersionClick('Version Information', {
              'UI Last Commit Information': uiCommitDetails.match({
                ifOk: (uiCommitdata) => {
                  return uiCommitdata;
                },
                ifError: (error) => {
                  return error.failureMessage;
                },
                ifLoading: () => {
                  return 'Still Loading...';
                },
              }),
            }),
        });
      },
      ifError: (error) => {
        fields.map((item) =>
          item.label === 'UI Version'
            ? {
                icon: 'link',
                label: 'UI Version',
                text: 'Show Details',
                onclick: () =>
                  this.onShowConnectorVersionClick('Version Information', {
                    'UI Commit Information': error.failureMessage,
                  }),
              }
            : item,
        );
      },
      ifLoading: () => {
        fields.push({
          icon: 'link',
          label: 'UI Version',
          text: 'Loading...',
        });
      },
    });

    return {
      groupLabel: 'Version Information',
      properties: fields,
    };
  }

  buildPropertyGridGroups(
    lastCommitInformation: Fetched<LastCommitInfo>,
    UiBuildDate: Fetched<String>,
    UiCommitDetails: Fetched<String>,
  ): PropertyGridGroup[] {
    let fieldGroups: PropertyGridGroup[];

    fieldGroups = [
      this.buildConnectorPropertyGridGroup(null),
      this.buildConnectorVersionGroup(
        lastCommitInformation,
        UiBuildDate,
        UiCommitDetails,
      ),
    ];

    return fieldGroups.filter((it) => it.properties.length);
  }
}