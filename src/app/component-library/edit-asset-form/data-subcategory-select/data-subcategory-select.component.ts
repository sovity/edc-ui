import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataCategorySelectItem} from '../data-category-select/data-category-select-item';
import {DataSubcategorySelectItem} from './data-subcategory-select-item';

@Component({
  selector: 'data-subcategory-select',
  templateUrl: 'data-subcategory-select.component.html',
})
export class DataSubcategorySelectComponent {
  @Input()
  label!: string;

  @Input()
  dataCategory: DataCategorySelectItem | null = null;

  @Input()
  control!: FormControl<DataSubcategorySelectItem | null>;
}
