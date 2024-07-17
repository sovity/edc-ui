import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {UiAssetMapped} from '../../../../core/services/models/ui-asset-mapped';

export interface AssetList {
  filteredAssets: UiAssetMapped[];
  numTotalAssets: number;
}

@Component({
  selector: 'asset-create-page',
  templateUrl: './asset-create-page.component.html',
  styleUrls: ['./asset-create-page.component.scss'],
})
export class AssetCreatePageComponent implements OnInit, OnDestroy {
  hey: FormControl<string> = this.formBuilder.nonNullable.control('');

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnDestroy$ = new Subject();
  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }
}
