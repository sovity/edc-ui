/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {JsonDialogModule} from '../../../component-library/json-dialog/json-dialog.module';
import {PolicyEditorModule} from '../../../component-library/policy-editor/policy-editor.module';
import {UiElementsModule} from '../../../component-library/ui-elements/ui-elements.module';
import {PolicyCardsComponent} from './policy-cards/policy-cards.component';
import {PolicyDefinitionPageComponent} from './policy-definition-page/policy-definition-page.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,

    // Angular Material
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,

    // EDC UI Modules
    PolicyEditorModule,
    UiElementsModule,
    JsonDialogModule,
  ],
  declarations: [PolicyCardsComponent, PolicyDefinitionPageComponent],
  exports: [PolicyDefinitionPageComponent],
})
export class PolicyDefinitionPageModule {}
