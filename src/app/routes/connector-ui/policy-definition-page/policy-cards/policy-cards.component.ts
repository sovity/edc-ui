/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EMPTY} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogModel} from '../../../../component-library/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import {JsonDialogComponent} from '../../../../component-library/json-dialog/json-dialog/json-dialog.component';
import {JsonDialogData} from '../../../../component-library/json-dialog/json-dialog/json-dialog.data';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {PolicyCard} from './policy-card';

@Component({
  selector: 'policy-cards',
  templateUrl: './policy-cards.component.html',
})
export class PolicyCardsComponent {
  @HostBinding('class.flex')
  @HostBinding('class.flex-wrap')
  @HostBinding('class.gap-[10px]')
  cls = true;

  @Input()
  policyCards: PolicyCard[] = [];

  @Input()
  deleteBusy = false;

  @Output()
  deleteDone = new EventEmitter();

  constructor(
    private edcApiService: EdcApiService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) {}

  onPolicyDetailClick(policyCard: PolicyCard) {
    let dialogRef: MatDialogRef<any>;
    const data: JsonDialogData = {
      title: policyCard.id,
      subtitle: this.translateService.instant('general.pol'),
      icon: 'policy',
      objectForJson: policyCard.objectForJson,
      toolbarButton: {
        text: this.translateService.instant('general.delete'),
        icon: 'delete',
        confirmation: ConfirmDialogModel.forDelete(
          'policy',
          policyCard.id,
          this.translateService,
        ),
        action: () =>
          this.edcApiService.deletePolicyDefinition(policyCard.id).pipe(
            tap(() => {
              this.notificationService.showInfo('Policy deleted!');
              this.deleteDone.emit();
              dialogRef?.close();
            }),
            catchError((err) => {
              const msg = `Failed deleting policy with id ${policyCard.id}`;
              console.error(msg, err);
              this.notificationService.showError(msg);
              return EMPTY;
            }),
          ),
      },
    };

    dialogRef = this.matDialog.open(JsonDialogComponent, {data});
  }
}
