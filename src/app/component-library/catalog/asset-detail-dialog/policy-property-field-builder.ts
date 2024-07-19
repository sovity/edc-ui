import {Injectable} from '@angular/core';
import {UiPolicy} from '@sovity.de/edc-client';
import {JsonDialogService} from '../../json-dialog/json-dialog/json-dialog.service';
import {PropertyGridField} from '../../property-grid/property-grid/property-grid-field';

@Injectable()
export class PolicyPropertyFieldBuilder {
  constructor(private jsonDialogService: JsonDialogService) {}

  buildPolicyPropertyFields(
    policy: UiPolicy,
    policyDetailDialogTitle: string,
    policyDetailDialogSubtitle: string,
  ): PropertyGridField[] {
    return [
      {
        icon: 'policy',
        label: 'Policy',
        additionalClasses: 'whitespace-pre-line',
        text: 'TODO',
      },
      {
        icon: 'policy',
        label: 'Policy JSON-LD',
        text: 'Show JSON-LD',
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
