import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {combineLatest, distinctUntilChanged, pairwise} from 'rxjs';
import {map} from 'rxjs/operators';
import {value$} from '../../../../../core/utils/form-group-utils';
import {noWhitespacesOrColonsValidator} from '../../../../../core/validators/no-whitespaces-or-colons-validator';
import {AssetsIdValidatorBuilder} from '../assets-id-validator-builder';
import {
  AssetGeneralFormModel,
  AssetGeneralFormValue,
} from './model/asset-general-form-model';

@Injectable()
export class AssetGeneralFormBuilder {
  constructor(
    private formBuilder: FormBuilder,
    private assetsIdValidatorBuilder: AssetsIdValidatorBuilder,
  ) {}

  buildFormGroup(
    initial: AssetGeneralFormValue,
  ): FormGroup<AssetGeneralFormModel> {
    const general: FormGroup<AssetGeneralFormModel> =
      this.formBuilder.nonNullable.group({
        id: [
          initial.id!,
          [Validators.required, noWhitespacesOrColonsValidator],
          [this.assetsIdValidatorBuilder.assetIdDoesNotExistsValidator()],
        ],
        name: [initial.name!, Validators.required],
        description: [initial.description!],
        keywords: [initial.keywords!],
        dataCategory: [initial.dataCategory || null, Validators.required],
        dataSubcategory: [initial.dataSubcategory || null],
      });

    this.initIdGeneration(general.controls.id, general.controls.name);

    return general;
  }

  private initIdGeneration(
    idCtrl: FormControl<string>,
    nameCtrl: FormControl<string>,
  ) {
    combineLatest([value$<string>(nameCtrl).pipe(distinctUntilChanged())])
      .pipe(
        map(([title]) => this.generateId(title)),
        pairwise(),
      )
      .subscribe(([previousId, currentId]) => {
        if (!idCtrl.value || idCtrl.value === previousId) {
          idCtrl.setValue(currentId);
        }
      });
  }

  private generateId(name: string | null) {
    if (!name) {
      return '';
    }
    return this.cleanIdComponent(name);
  }

  private cleanIdComponent(s: string | null) {
    return (s ?? '')
      .trim()
      .replace(':', '-')
      .replaceAll(' ', '-')
      .toLowerCase();
  }
}
