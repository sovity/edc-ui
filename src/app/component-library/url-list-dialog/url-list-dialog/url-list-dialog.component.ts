import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {UrlListDialogData} from './url-list-dialog.data';

@Component({
  selector: 'app-json-dialog',
  templateUrl: './url-list-dialog.component.html',
})
export class UrlListDialogComponent implements OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<UrlListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UrlListDialogData,
  ) {}

  ngOnDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
