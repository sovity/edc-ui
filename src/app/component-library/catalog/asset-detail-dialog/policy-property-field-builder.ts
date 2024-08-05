/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UiPolicy} from '@sovity.de/edc-client';
import {JsonDialogService} from '../../json-dialog/json-dialog/json-dialog.service';
import {PolicyMapper} from '../../policy-editor/model/policy-mapper';
import {PropertyGridField} from '../../property-grid/property-grid/property-grid-field';

@Injectable()
export class PolicyPropertyFieldBuilder {
  constructor(
    private jsonDialogService: JsonDialogService,
    private policyMapper: PolicyMapper,
    private translateService: TranslateService,
  ) {}

  buildPolicyPropertyFields(
    policy: UiPolicy,
    policyDetailDialogTitle: string,
    policyDetailDialogSubtitle: string,
  ): PropertyGridField[] {
    return [
      {
        icon: 'policy',
        label: this.translateService.instant('general.policy'),
        policy: this.policyMapper.buildPolicy(policy.expression!),
        policyErrors: policy.errors || [],
        additionalContainerClasses: 'col-span-2',
      },
      {
        icon: 'policy',
        label: this.translateService.instant('general.policy') + ' JSON-LD',
        text: this.translateService.instant('component_library.json_ld'),
        onclick: () =>
          this.jsonDialogService.showJsonDetailDialog({
            title: policyDetailDialogTitle,
            subtitle: policyDetailDialogSubtitle,
            icon: 'policy',
            objectForJson: JSON.parse(policy.policyJsonLd),
          }),
      },
    ];
  }
}
