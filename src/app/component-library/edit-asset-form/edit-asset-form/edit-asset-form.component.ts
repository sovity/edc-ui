import {Component, EventEmitter, Output} from '@angular/core';
import {ValidationMessages} from 'src/app/core/validators/validation-messages';
import {DATA_SOURCE_HTTP_METHODS} from 'src/app/routes/connector-ui/asset-page/asset-edit-dialog/form/http-methods';
import {EditAssetForm} from './form/edit-asset-form';

@Component({
  selector: 'edit-asset-form',
  templateUrl: './edit-asset-form.component.html',
  styleUrls: ['./edit-asset-form.component.scss'],
  providers: [],
})
export class EditAssetFormComponent {
  @Output() submit = new EventEmitter();

  loading = false;
  methods = DATA_SOURCE_HTTP_METHODS;

  constructor(
    public form: EditAssetForm,
    public validationMessages: ValidationMessages,
  ) {}
}
