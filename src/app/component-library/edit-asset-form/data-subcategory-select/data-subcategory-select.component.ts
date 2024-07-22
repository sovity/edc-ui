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
  id!: string;

  ngOnInit(): void {
    this.id = this.buildId();
  }

  @Input()
  dataCategory: DataCategorySelectItem | null = null;

  @Input()
  control!: FormControl<DataSubcategorySelectItem | null>;

  private buildId(): string {
    return `asset-create-form-${this.label.toLowerCase().replaceAll(' ', '-')}`;
  }
}
