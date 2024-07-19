import {Component, Input} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DATA_CATEGORY_SELECT_DATA} from './data-category-select-data';
import {DataCategorySelectItem} from './data-category-select-item';

@Component({
  selector: 'data-category-select',
  templateUrl: 'data-category-select.component.html',
})
export class DataCategorySelectComponent {
  @Input()
  label!: string;

  @Input()
  control!: FormControl<DataCategorySelectItem | null>;

  @Input()
  allTouched = false;

  items = DATA_CATEGORY_SELECT_DATA;

  isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }
}
