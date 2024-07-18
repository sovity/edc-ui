import {Component, Input, OnInit} from '@angular/core';
import {AssetGeneralFormBuilder} from './form/asset-general-form-builder';
import {EditAssetForm} from './form/edit-asset-form';
import {EditAssetFormValue} from './form/model/edit-asset-form-model';

@Component({
  selector: 'edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.scss'],
  providers: [EditAssetForm, AssetGeneralFormBuilder],
})
export class EditAssetFormComponent implements OnInit {
  @Input() initialFormValue!: EditAssetFormValue;
  loading = false;

  constructor(public form: EditAssetForm) {}

  ngOnInit(): void {
    this.form.reset(this.initialFormValue);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
