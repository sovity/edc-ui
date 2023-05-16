import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {AppConfig} from '../../../app/config/app-config';
import {AppConfigService} from '../../../app/config/app-config.service';
import {ConnectorInfoPropertyGridGroupBuilder} from './connector-info-property-grid-group-builder';
import {DashboardData, defaultDashboardData} from './dashboard-data';
import {DashboardDataService} from './dashboard-data.service';

@Component({
  selector: 'edc-demo-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [ConnectorInfoPropertyGridGroupBuilder],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: DashboardData = defaultDashboardData();

  config!: AppConfig;

  private refresh$ = new BehaviorSubject(true);

  constructor(
    private dashboardDataService: DashboardDataService,
    private appConfigService: AppConfigService,
  ) {}

  ngOnInit() {
    this.config = this.appConfigService.config;

    this.refresh$
      .pipe(
        switchMap(() => this.dashboardDataService.getDashboardData()),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
