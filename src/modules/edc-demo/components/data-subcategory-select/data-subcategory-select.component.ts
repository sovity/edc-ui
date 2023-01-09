import {Component, HostBinding, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DATA_SUBCATEGORY_SELECT_DATA} from './data-subcategory-select-data';
import {DataSubcategorySelectItem} from "./data-subcategory-select-item";
import {DataCategorySelectItem} from "../data-category-select/data-category-select-item";

@Component({
  selector: 'data-subcategory-select',
  templateUrl: 'data-subcategory-select.component.html',
})
export class DataSubcategorySelectComponent {
  @Input()
  label!: string;

  @Input()
  dataCategory: DataCategorySelectItem | null = null

  @Input()
  control!: FormControl<DataSubcategorySelectItem | null>

  @HostBinding("class.flex")
  @HostBinding("class.flex-row")
  cls = true

  compareWith(a: DataSubcategorySelectItem | null, b: DataSubcategorySelectItem | null): boolean {
    return a?.id === b?.id;
  }
}
