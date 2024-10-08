import {Component, Input, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';
import {AssetDetailDialogDataService} from '../../../../shared/business/asset-detail-dialog/asset-detail-dialog-data.service';
import {AssetDetailDialogService} from '../../../../shared/business/asset-detail-dialog/asset-detail-dialog.service';

@Component({
  selector: 'asset-select',
  templateUrl: './asset-select.component.html',
})
export class AssetSelectComponent implements OnDestroy {
  @Input()
  label!: string;

  @Input()
  control!: FormControl<UiAssetMapped[]>;

  @Input()
  assets: UiAssetMapped[] = [];

  constructor(
    private assetDetailDialogDataService: AssetDetailDialogDataService,
    private assetDetailDialogService: AssetDetailDialogService,
  ) {}

  onAssetClick(asset: UiAssetMapped) {
    const data = this.assetDetailDialogDataService.assetDetailsReadonly(asset);
    this.assetDetailDialogService.open(data, this.ngOnDestroy$);
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
