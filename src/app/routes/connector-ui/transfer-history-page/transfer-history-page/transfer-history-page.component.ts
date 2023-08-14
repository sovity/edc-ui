import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransferHistoryEntry} from '@sovity.de/edc-client';
import {
  AssetDetailDialogDataService
} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog-data.service';
import {
  AssetDetailDialogComponent
} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog.component';
import {JsonDialogComponent} from '../../../../component-library/json-dialog/json-dialog/json-dialog.component';
import {JsonDialogData} from '../../../../component-library/json-dialog/json-dialog/json-dialog.data';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {AssetPropertyMapper} from '../../../../core/services/asset-property-mapper';
import {Asset} from '../../../../core/services/models/asset';
import {Fetched} from '../../../../core/services/models/fetched';
import {NotificationService} from '../../../../core/services/notification.service';


@Component({
  selector: 'transfer-history-page',
  templateUrl: './transfer-history-page.component.html',
  styleUrls: ['./transfer-history-page.component.scss'],
})
export class TransferHistoryPageComponent implements OnInit {
  columns: string[] = [
    'direction',
    'assetId',
    'state',
    'lastUpdated',
    'counterPartyConnectorEndpoint',
    'details',
  ];
  transferProcessesList: Fetched<{
    transferProcesses: Array<TransferHistoryEntry>;
  }> = Fetched.empty();

  constructor(
    private edcApiService: EdcApiService,
    private assetDetailDialogDataService: AssetDetailDialogDataService,
    private assetPropertyMapper: AssetPropertyMapper,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
  }

  onTransferHistoryDetailsClick(item: TransferHistoryEntry) {
    const data: JsonDialogData = {
      title: item.assetName ?? item.assetId,
      subtitle: 'Transfer History Details',
      icon: 'assignment',
      objectForJson: item,
    };
    this.dialog.open(JsonDialogComponent, {data});
  }

  loadAssetDetails(transferProcessId: string): Observable<Asset> {
    return this.edcApiService.getTransferProcessAsset(transferProcessId)
      .pipe(
        map((asset) =>
          this.assetPropertyMapper.buildAssetFromProperties(asset.properties),
        ),
      );
  }

  onAssetDetailsClick(transferProcessId: string) {
    this.loadAssetDetails(transferProcessId).subscribe({
      next: (asset) => {
        this.dialog.open(AssetDetailDialogComponent, {
          data: this.assetDetailDialogDataService.assetDetails(
            asset,
            false,
          ),
          maxHeight: '90vh',
        });
      },
      error: (error) => {
        console.error('Failed to fetch asset details!', error);
        this.notificationService.showError("Failed to fetch asset details!");
      },
    });
  }

  ngOnInit(): void {
    this.loadTransferProcesses();
  }

  loadTransferProcesses() {
    this.edcApiService.getTransferHistoryPage()
      .pipe(
        map((transferHistoryPage) => ({
          transferProcesses: transferHistoryPage.transferEntries
        })),
        Fetched.wrap({
          failureMessage: 'Failed fetching transfer history.',
        }),
      )
      .subscribe(
        (transferProcessesList) =>
          (this.transferProcessesList = transferProcessesList),
      );
  }
}
