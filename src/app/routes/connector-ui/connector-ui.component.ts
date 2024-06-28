/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../core/config/app-config';
import {LoginPollingService} from '../../core/services/login-polling.service';
import {TitleUtilsService} from '../../core/services/title-utils.service';
import {routes} from './connector-ui-routing.module';

@Component({
  selector: 'connector-ui-page-layout',
  templateUrl: './connector-ui.component.html',
  styleUrls: ['./connector-ui.component.scss'],
  providers: [TitleUtilsService],
})
export class ConnectorUiComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  routes = routes;

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    public titleUtilsService: TitleUtilsService,
    public titleService: Title,
    private breakpointObserver: BreakpointObserver,
    private loginPollingService: LoginPollingService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('selectedLanguage') || 'en');
  }

  ngOnInit() {
    this.titleUtilsService.startUpdatingTitleFromRouteData('EDC Connector');
    this.startLoginPolling();
  }

  private startLoginPolling() {
    this.loginPollingService.startPolling();
  }
}
