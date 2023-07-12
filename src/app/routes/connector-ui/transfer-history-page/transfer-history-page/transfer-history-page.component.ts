import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AssetDetailDialogDataService} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog-data.service';
import {AssetDetailDialogComponent} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog.component';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from '../../../../component-library/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import {JsonDialogComponent} from '../../../../component-library/json-dialog/json-dialog/json-dialog.component';
import {JsonDialogData} from '../../../../component-library/json-dialog/json-dialog/json-dialog.data';
import {TransferProcessService} from '../../../../core/services/api/legacy-managent-api-client';
import {AssetPropertyMapper} from '../../../../core/services/asset-property-mapper';
import {Asset} from '../../../../core/services/models/asset';
import {Fetched} from '../../../../core/services/models/fetched';
import {TransferProcessDto} from '../../../../core/services/models/transfer-history-entry';
import {NotificationService} from '../../../../core/services/notification.service';
import {TransferProcessAssetDetailsService} from '../../../../core/services/transfer-process-asset-details.service';

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
    transferProcesses: Array<TransferProcessDto>;
  }> = Fetched.empty();

  constructor(
    private transferProcessService: TransferProcessService,
    private transferProcessAssetDetailsService: TransferProcessAssetDetailsService,
    private assetDetailDialogDataService: AssetDetailDialogDataService,
    private assetPropertyMapper: AssetPropertyMapper,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  onTransferHistoryDetailsClick(item: TransferProcessDto) {
    const data: JsonDialogData = {
      title: item.assetName ?? item.assetId,
      subtitle: 'Transfer History Details',
      icon: 'assignment',
      objectForJson: item,
    };
    this.dialog.open(JsonDialogComponent, {data});
  }

  loadingAssetDetails(assetId: string): Observable<Fetched<Asset>> {
    return this.transferProcessAssetDetailsService
      .getTransferProcessAssetDetails(assetId)
      .pipe(
        map((asset) =>
          this.assetPropertyMapper.buildAssetFromProperties(asset.properties),
        ),
        Fetched.wrap({
          failureMessage: 'Failed fetching asset details!',
        }),
      );
  }

  buildAssetDetailsDialog(fetchedAssetData: Fetched<Asset>) {
    fetchedAssetData.match({
      ifOk: (assetData) => {
        this.dialog.open(AssetDetailDialogComponent, {
          data: this.assetDetailDialogDataService.assetDetails(
            assetData,
            false,
          ),
          maxHeight: '90vh',
        });
      },
      ifError: (error) => {
        console.log(error);
        this.notificationService.showError(error.failureMessage);
      },
      ifLoading: () => {},
    });
  }

  onAssetDetailsClick(transferProcessId: string) {
    this.loadingAssetDetails(transferProcessId).subscribe((fetchedAssetData) => {
      this.buildAssetDetailsDialog(fetchedAssetData);
    });
  }

  ngOnInit(): void {
    this.loadTransferProcesses();
  }

  onDeprovision(transferProcess: TransferProcessDto): void {
    const dialogData = new ConfirmDialogModel(
      'Confirm deprovision',
      `Deprovisioning resources for transfer [${transferProcess.id}] will take some time and once started, it cannot be stopped.`,
    );
    dialogData.confirmColor = 'warn';
    dialogData.confirmText = 'Confirm';
    dialogData.cancelText = 'Abort';
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '20%',
      data: dialogData,
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.transferProcessService
          .deprovisionTransferProcess(transferProcess.id)
          .subscribe(() => this.loadTransferProcesses());
      }
    });
  }

  loadTransferProcesses() {
    this.transferProcessService
      .getAllTransferProcesses(0, 10_000_000)
      .pipe(
        map((transferProcesses) => ({
          transferProcesses: [...transferProcesses].sort(function (a, b) {
            return (
              new Date(b.lastUpdatedDate)?.valueOf()! -
              new Date(a.lastUpdatedDate)?.valueOf()!
            );
          }),
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
