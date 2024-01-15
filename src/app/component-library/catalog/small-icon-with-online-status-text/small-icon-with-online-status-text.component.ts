import {Component, Input} from '@angular/core';
import {capitalize} from 'src/app/core/utils/string-utils';
import {
  ConnectorOnlineStatus,
  getOnlineStatusColor,
  getOnlineStatusSmallIcon,
} from '../icon-with-online-status/online-status-utils';

@Component({
  selector: 'small-icon-with-online-status-text',
  templateUrl: 'small-icon-with-online-status-text.component.html',
})
export class SmallIconWithOnlineStatusText {
  @Input() onlineStatus!: ConnectorOnlineStatus;

  get onlineStatusText(): string {
    return capitalize(this.onlineStatus.toLowerCase());
  }

  get onlineStatusColor(): string {
    return getOnlineStatusColor(this.onlineStatus);
  }

  get onlineStatusIcon(): string {
    return getOnlineStatusSmallIcon(this.onlineStatus);
  }
}
