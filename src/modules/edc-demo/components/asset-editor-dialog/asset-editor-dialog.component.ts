import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {AssetService} from '../../../edc-dmgmt-client';
import {AssetEntryBuilder} from '../../services/asset-entry-builder';
import {NotificationService} from '../../services/notification.service';
import {ValidationMessages} from '../../validators/validation-messages';
import {AssetEditorDialogForm} from './asset-editor-dialog-form';
import {AssetEditorDialogResult} from './asset-editor-dialog-result';
import {AssetAdvancedFormBuilder} from './model/asset-advanced-form-builder';
import {AssetDatasourceFormBuilder} from './model/asset-datasource-form-builder';
import {AssetMetadataFormBuilder} from './model/asset-metadata-form-builder';

@Component({
  selector: 'edc-demo-asset-editor-dialog',
  templateUrl: './asset-editor-dialog.component.html',
  providers: [
    AssetAdvancedFormBuilder,
    AssetDatasourceFormBuilder,
    AssetEditorDialogForm,
    AssetEntryBuilder,
    AssetMetadataFormBuilder,
  ],
})
export class AssetEditorDialog implements OnDestroy {
  loading = false;

  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

  constructor(
    public form: AssetEditorDialogForm,
    public validationMessages: ValidationMessages,
    private assetEntryBuilder: AssetEntryBuilder,
    private notificationService: NotificationService,
    private assetService: AssetService,
    private dialogRef: MatDialogRef<AssetEditorDialog>,
  ) {}

  onSave() {
    const formValue = this.form.value;
    const assetEntryDto = this.assetEntryBuilder.buildAssetEntry(formValue);

    this.form.all.disable();
    this.loading = true;
    this.assetService
      .createAsset(assetEntryDto)
      .pipe(
        takeUntil(this.ngOnDestroy$),
        finalize(() => {
          this.form.all.enable();
          this.loading = false;
        }),
      )
      .subscribe({
        complete: () => {
          this.notificationService.showInfo('Successfully created');
          this.close({refreshList: true});
        },
        error: (error) => {
          console.error('Failed creating asset!', error);
          this.notificationService.showError('Failed creating asset!');
        },
      });
  }

  private close(params: AssetEditorDialogResult) {
    this.dialogRef.close(params);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
