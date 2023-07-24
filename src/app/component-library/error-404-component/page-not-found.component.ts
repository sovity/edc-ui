import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, AppConfig} from '../../core/config/app-config';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {
  navigator!: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit(): void {
    if (this.config.profile != 'broker') {
      this.navigator = 'Dashboard';
    } else {
      this.navigator = 'Data Offers';
    }
  }
}
