import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {CatalogModule} from '../../../component-library/catalog/catalog.module';
import {DataAddressModule} from '../../../component-library/data-address/data-address.module';
import {PipesAndDirectivesModule} from '../../../component-library/pipes-and-directives/pipes-and-directives.module';
import {UiElementsModule} from '../../../component-library/ui-elements/ui-elements.module';
import {AssetCreatePageFormGroupComponent} from './asset-create-page-form-group/asset-create-page-form-group.component';
import {AssetCreatePageFormLabelComponent} from './asset-create-page-form-label/asset-create-page-form-label.component';
import {AssetCreatePageComponent} from './asset-create-page/asset-create-page.component';
import {DataCategorySelectComponent} from './data-category-select/data-category-select.component';
import {DataSubcategoryItemsPipe} from './data-subcategory-select/data-subcategory-items.pipe';
import {DataSubcategorySelectComponent} from './data-subcategory-select/data-subcategory-select.component';
import {KeywordSelectComponent} from './keyword-select/keyword-select.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Angular Material
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,

    // EDC UI Modules
    CatalogModule,
    DataAddressModule,
    PipesAndDirectivesModule,
    UiElementsModule,
  ],
  declarations: [
    AssetCreatePageComponent,
    AssetCreatePageFormGroupComponent,
    AssetCreatePageFormLabelComponent,
    KeywordSelectComponent,
    DataCategorySelectComponent,
    DataSubcategorySelectComponent,
    DataSubcategoryItemsPipe,
  ],
  exports: [AssetCreatePageComponent],
  providers: [],
})
export class AssetCreatePageModule {}
