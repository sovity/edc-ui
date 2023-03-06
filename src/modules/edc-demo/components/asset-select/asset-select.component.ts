import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {filter, map} from 'rxjs/operators';
import {Asset} from '../../models/asset';
import {AssetDetailDialogData} from '../asset-detail-dialog/asset-detail-dialog-data';
import {AssetDetailDialogResult} from '../asset-detail-dialog/asset-detail-dialog-result';
import {AssetDetailDialog} from '../asset-detail-dialog/asset-detail-dialog.component';

@Component({
  selector: 'asset-select',
  templateUrl: './asset-select.component.html',
})
export class AssetSelectComponent {
  @Input()
  label!: string;

  @Input()
  control!: FormControl<Asset[]>;

  @Input()
  assets: Asset[] = [];

  @Output()
  deleteDone = new EventEmitter();

  constructor(private matDialog: MatDialog) {}

  isEqualId(a: Asset | null, b: Asset | null): boolean {
    return a?.id === b?.id;
  }

  onAssetClick(asset: Asset) {
    const data = AssetDetailDialogData.forAssetDetails(asset, false);
    const ref = this.matDialog.open(AssetDetailDialog, {
      data,
      maxHeight: '90vh',
    });
    ref
      .afterClosed()
      .pipe(
        map((it) => it as AssetDetailDialogResult | null),
        filter((it) => !!it?.refreshList),
      )
      .subscribe(() => this.deleteDone.emit());
  }
}
