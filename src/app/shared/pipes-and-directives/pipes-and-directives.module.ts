import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AutofocusDirective} from './autofocus.direcitive';
import {CompareByFieldPipe} from './compare-by-field.pipe';
import {ExternalLinkDirective} from './external-link.directive';
import {IsActiveFeaturePipe} from './is-active-feature.pipe';
import {RemoveClassDirective} from './remove-class.directive';
import {TrackByFieldDirective} from './track-by-field.directive';
import {ValuesPipe} from './values.pipe';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Angular Material
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [],
  exports: [
    AutofocusDirective,
    CompareByFieldPipe,
    ExternalLinkDirective,
    IsActiveFeaturePipe,
    RemoveClassDirective,
    TrackByFieldDirective,
    ValuesPipe,
  ],
})
export class PipesAndDirectivesModule {}
