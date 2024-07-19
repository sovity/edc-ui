import {Component, EventEmitter, Output} from '@angular/core';
import {ValidationMessages} from 'src/app/core/validators/validation-messages';
import {EditAssetForm} from './form/edit-asset-form';
import {DATA_SOURCE_HTTP_METHODS} from './form/http-methods';

@Component({
  selector: 'edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.scss'],
  providers: [],
})
export class EditAssetFormComponent {
  @Output() submitClicked = new EventEmitter();

  loading = false;
  methods = DATA_SOURCE_HTTP_METHODS;

  constructor(
    public form: EditAssetForm,
    public validationMessages: ValidationMessages,
  ) {
    console.log(form.value);
  }
}
