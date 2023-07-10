import {Component, Input} from '@angular/core';
import {
  CatalogDataOfferConnectorOnlineStatusEnum,
  ConnectorDetailPageResultOnlineStatusEnum,
  ConnectorListEntryOnlineStatusEnum,
  DataOfferDetailPageResultConnectorOnlineStatusEnum,
} from '@sovity.de/broker-server-client';

@Component({
  selector: 'status-icon',
  template: `
    <mat-icon
      class="flex items-end justify-end w-[40px] h-[40px] mr-[20px]"
      mat-card-avatar
      >{{ mainIcon }}</mat-icon
    >

    <div class="absolute w-4 h-4">
      <mat-icon
        *ngIf="onlineStatus"
        class="mat-icon-[16px]"
        [ngClass]="getStatusClass(onlineStatus)"
        >{{ getSmallIcon(onlineStatus) }}</mat-icon
      >
    </div>
    <!-- Main Icon -->
  `,
})
export class IconWithOnlineStatusComponent {
  @Input()
  mainIcon!: string;

  @Input()
  smallIcon!: string;

  @Input()
  onlineStatus!:
    | CatalogDataOfferConnectorOnlineStatusEnum
    | ConnectorListEntryOnlineStatusEnum
    | DataOfferDetailPageResultConnectorOnlineStatusEnum
    | ConnectorDetailPageResultOnlineStatusEnum;

  getStatusClass(status: any) {
    switch (status) {
      case 'ONLINE':
        return 'broker-online-status-online';
      case 'OFFLINE':
        return 'broker-online-status-offline';
      case 'DEAD':
        return 'broker-online-status-dead';
      default:
        return '';
    }
  }
  getSmallIcon(status: any) {
    switch (status) {
      case 'ONLINE':
        return 'check_circle';
      case 'OFFLINE':
        return 'pause_circle';
      case 'DEAD':
        return 'remove_circle';
      default:
        return '';
    }
  }
}
