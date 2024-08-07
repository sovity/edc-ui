import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataAddressType} from './data-address-type';
import {dataAddressTypeSelectItemsLegacy} from './data-address-type-select-items';
import {DataAddressTypeSelectModeLegacy} from './data-address-type-select-mode';

@Component({
  selector: 'data-address-type-select-legacy',
  templateUrl: 'data-address-type-select.component.html',
})
export class DataAddressTypeSelectLegacyComponent implements OnChanges {
  @Input()
  label!: string;

  @Input()
  control!: FormControl<DataAddressType | null>;

  @HostBinding('class.flex')
  @HostBinding('class.flex-row')
  cls = true;

  @Input()
  mode: DataAddressTypeSelectModeLegacy = 'Datasource';

  items = dataAddressTypeSelectItemsLegacy(this.mode);
  ngOnChanges(changes: SimpleChanges) {
    if (changes.mode) {
      this.items = dataAddressTypeSelectItemsLegacy(this.mode);
    }
  }
}
