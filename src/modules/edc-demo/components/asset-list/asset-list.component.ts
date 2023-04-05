import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AssetWithAdditionalAssetProperties } from '../../models/asset-with-additional-asset-properties';


@Component({
  selector: 'edc-demo-asset-list',
  templateUrl: './asset-list.component.html',
})
export class AssetListComponent {
  @HostBinding('class.flex')
  @HostBinding('class.flex-wrap')
  @HostBinding('class.gap-[10px]')
  cls = true;

  @Input()
  assets: AssetWithAdditionalAssetProperties[] = [];

  @Output()
  assetClick = new EventEmitter<AssetWithAdditionalAssetProperties>();
}
