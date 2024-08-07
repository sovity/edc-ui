import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {ConfirmationDialogModule} from '../confirmation-dialog/confirmation-dialog.module';
import {MarkdownDescriptionModule} from '../markdown-description/markdown-description.module';
import {PipesAndDirectivesModule} from '../pipes-and-directives/pipes-and-directives.module';
import {ConditionsForUseDialogComponent} from './conditions-for-use-dialog/conditions-for-use-dialog.component';
import {ConditionsForUseDialogService} from './conditions-for-use-dialog/conditions-for-use-dialog.service';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,

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
    MarkdownDescriptionModule,
  ],
  declarations: [ConditionsForUseDialogComponent],
  providers: [ConditionsForUseDialogService],
  exports: [ConditionsForUseDialogComponent],
})
export class ConditionsForUseDialogModule {}
