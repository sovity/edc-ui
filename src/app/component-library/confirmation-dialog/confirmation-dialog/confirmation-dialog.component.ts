/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}

export class ConfirmDialogModel {
  private _confirmText: string = 'OK';
  private _cancelText: string = 'Cancel';
  private _cancelColor: 'accent' | 'warn' | 'primary' | '' = '';
  private _confirmColor: 'accent' | 'warn' | 'primary' | '' = '';

  constructor(public title: string, public message: string) {}

  get cancelColor(): 'accent' | 'warn' | 'primary' | '' {
    return this._cancelColor;
  }

  set cancelColor(value: 'accent' | 'warn' | 'primary' | '') {
    this._cancelColor = value;
  }

  get confirmColor(): 'accent' | 'warn' | 'primary' | '' {
    return this._confirmColor;
  }

  set confirmColor(value: 'accent' | 'warn' | 'primary' | '') {
    this._confirmColor = value;
  }

  get cancelText(): string {
    return this._cancelText;
  }

  set cancelText(value: string) {
    this._cancelText = value;
  }

  get confirmText(): string {
    return this._confirmText;
  }

  set confirmText(value: string) {
    this._confirmText = value;
  }

  public static forDelete(
    type: string,
    identifier: string,
    translateService: TranslateService,
  ): ConfirmDialogModel {
    const dialogData = new ConfirmDialogModel(
      `${translateService.instant('component_library.delete_title')}`,
      `${translateService.instant(
        'component_library.delete_one',
      )} ${type} ${identifier} ${translateService.instant(
        'component_library.delete_two',
      )}`,
    );
    dialogData.confirmColor = translateService.instant('general.warn');
    dialogData.confirmText = translateService.instant('general.delete');
    dialogData.cancelText = translateService.instant('general.close');
    return dialogData;
  }
}
