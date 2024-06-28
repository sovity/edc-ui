/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EdcUiFeature} from '../../core/config/profiles/edc-ui-feature';
import {AssetPageComponent} from './asset-page/asset-page/asset-page.component';
import {CatalogBrowserPageComponent} from './catalog-browser-page/catalog-browser-page/catalog-browser-page.component';
import {ConnectorUiComponent} from './connector-ui.component';
import {ContractAgreementPageComponent} from './contract-agreement-page/contract-agreement-page/contract-agreement-page.component';
import {ContractDefinitionPageComponent} from './contract-definition-page/contract-definition-page/contract-definition-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page/dashboard-page.component';
import {LogoutPageComponent} from './logout-page/logout-page.component';
import {PolicyDefinitionPageComponent} from './policy-definition-page/policy-definition-page/policy-definition-page.component';
import {TransferHistoryPageComponent} from './transfer-history-page/transfer-history-page/transfer-history-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    title: 'connector_ui.dashboard',
    data: {title: 'dashboard', icon: 'data_usage'},
  },
  {
    path: 'catalog-browser',
    component: CatalogBrowserPageComponent,
    title: 'connector_ui.catalog',
    data: {title: 'catalog', icon: 'sim_card'},
  },
  {
    path: 'contracts',
    component: ContractAgreementPageComponent,
    title: 'connector_ui.contracts',
    data: {title: 'contracts', icon: 'attachment'},
  },
  {
    path: 'transfer-history',
    component: TransferHistoryPageComponent,
    title: 'connector_ui.transfer',
    data: {title: 'transfer', icon: 'assignment'},
  },
  {
    path: 'my-assets', // must not be "assets" to prevent conflict with assets directory
    component: AssetPageComponent,
    title: 'connector_ui.assets',
    data: {title: 'assets', icon: 'upload'},
  },
  {
    path: 'policies',
    component: PolicyDefinitionPageComponent,
    title: 'connector_ui.policies',
    data: {title: 'policies', icon: 'policy'},
  },
  {
    path: 'contract-definitions',
    component: ContractDefinitionPageComponent,
    title: 'connector_ui.contract',
    data: {title: 'contract', icon: 'rule'},
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
    title: 'connector_ui.logout',
    data: {
      title: 'logout',
      icon: 'logout',
      requiresFeature: 'logout-button' as EdcUiFeature,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ConnectorUiComponent, children: routes},
    ]),
  ],
  exports: [RouterModule],
})
export class ConnectorUiRoutingModule {}
