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
import {NavItemGroup} from 'src/app/core/services/models/nav-item-group';
import {NavItemsBuilder} from 'src/app/core/services/nav-items-builder';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../core/config/app-config';
import {LoginPollingService} from '../../core/services/login-polling.service';
import {TitleUtilsService} from '../../core/services/title-utils.service';

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

  navItemGroups: NavItemGroup[] = [];

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    public titleUtilsService: TitleUtilsService,
    public titleService: Title,
    private breakpointObserver: BreakpointObserver,
    private loginPollingService: LoginPollingService,
    private navItemsBuilder: NavItemsBuilder,
    private translateService: TranslateService,
  ) {
    this.navItemGroups = this.navItemsBuilder.buildNavItemGroups();
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
