/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {PolicyDefinitionBuilder} from '../../../../core/services/policy-definition-builder';
import {ValidationMessages} from '../../../../core/validators/validation-messages';
import {NewPolicyDialogForm} from './new-policy-dialog-form';
import {NewPolicyDialogResult} from './new-policy-dialog-result';

@Component({
  selector: 'new-policy-dialog',
  templateUrl: './new-policy-dialog.component.html',
  providers: [NewPolicyDialogForm],
})
export class NewPolicyDialogComponent implements OnDestroy {
  loading = false;

  constructor(
    private edcApiService: EdcApiService,
    public form: NewPolicyDialogForm,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<NewPolicyDialogComponent>,
    public validationMessages: ValidationMessages,
    private policyDefinitionBuilder: PolicyDefinitionBuilder,
    private translateService: TranslateService,
  ) {}

  onSave() {
    const formValue = this.form.value;
    const policyDefinition =
      this.policyDefinitionBuilder.buildPolicyDefinition(formValue);
    this.form.group.disable();
    this.loading = true;
    this.edcApiService
      .createPolicyDefinition(policyDefinition)
      .pipe(
        takeUntil(this.ngOnDestroy$),
        finalize(() => {
          this.form.group.enable();
          this.loading = false;
        }),
      )
      .subscribe({
        complete: () => {
          const succ_pol = this.translateService.instant(
            'notification.succ_pol',
          );
          this.notificationService.showInfo(succ_pol);
          this.close({refreshList: true});
        },
        error: (error) => {
          const fai_pol = this.translateService.instant('notification.fai_pol');
          console.error(fai_pol, error);
          this.notificationService.showError(fai_pol);
        },
      });
  }

  private close(params: NewPolicyDialogResult) {
    this.dialogRef.close(params);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
