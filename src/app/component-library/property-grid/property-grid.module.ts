import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UiElementsModule} from '../ui-elements/ui-elements.module';
import {PropertyGridGroupComponent} from './property-grid-group/property-grid-group.component';
import {PropertyGridComponent} from './property-grid/property-grid.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Angular Material
    MatIconModule,
    MatProgressSpinnerModule,

    // EDC UI Feature Modules
    UiElementsModule,
  ],
  declarations: [PropertyGridComponent, PropertyGridGroupComponent],
  exports: [PropertyGridComponent, PropertyGridGroupComponent],
})
export class PropertyGridModule {}
