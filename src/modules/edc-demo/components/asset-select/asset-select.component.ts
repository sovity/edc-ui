import {Component, HostBinding, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Asset} from '../../models/asset';

@Component({
  selector: 'edc-demo-asset-select',
  templateUrl: './asset-select.component.html',
})
export class AssetSelectComponent {
  @Input()
  label!: string;

  @Input()
  control!: FormControl<Asset[]>;

  @Input()
  assets: Asset[] = [];

  @HostBinding('class.flex')
  @HostBinding('class.flex-row')
  cls = true;

  isEqualId(a: {id: string}, b: {id: string}): boolean {
    return a?.id === b?.id;
  }
}
