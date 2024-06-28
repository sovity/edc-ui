/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {ConfirmationDialogModule} from '../confirmation-dialog/confirmation-dialog.module';
import {PipesAndDirectivesModule} from '../pipes-and-directives/pipes-and-directives.module';
import {UrlListDialogComponent} from './url-list-dialog/url-list-dialog.component';
import {UrlListDialogService} from './url-list-dialog/url-list-dialog.service';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    TranslateModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,

    // Third Party
    NgxJsonViewerModule,

    // EDC UI Modules
    PipesAndDirectivesModule,
    ConfirmationDialogModule,
  ],
  declarations: [UrlListDialogComponent],
  providers: [UrlListDialogService],
  exports: [UrlListDialogComponent],
})
export class UrlListDialogModule {}
