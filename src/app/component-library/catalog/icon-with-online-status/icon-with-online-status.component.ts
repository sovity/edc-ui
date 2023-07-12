import {Component, HostBinding, Input} from '@angular/core';
import {
  CatalogDataOfferConnectorOnlineStatusEnum,
  ConnectorDetailPageResultOnlineStatusEnum,
  ConnectorListEntryOnlineStatusEnum,
  DataOfferDetailPageResultConnectorOnlineStatusEnum,
} from '@sovity.de/broker-server-client';

@Component({
  selector: 'icon-with-online-status',
  template: `
    <mat-icon
      *ngIf="onlineStatus"
      class="absolute mat-icon-[16px] mt-[26px] ml-[26px]"
      [ngClass]="getStatusClass(onlineStatus)"
      >{{ getSmallIcon(onlineStatus) }}</mat-icon
    >

    <mat-icon class="mat-icon-[40px]">{{ mainIcon }}</mat-icon>
  `,
})
export class IconWithOnlineStatusComponent {
  @HostBinding('class.mat-icon-[40px]')
  cls = true;

  @Input()
  mainIcon!: string;

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
