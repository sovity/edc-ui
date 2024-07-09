import {
  Component,
  EventEmitter, // EventEmitter, Input, Output
  OnInit,
  Output,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
})
export class ExpressionFormComponent implements OnInit {
  @Output() expressionFormChange = new EventEmitter<FormGroup>();

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formGroup = new FormGroup({
      expressionType: new FormControl('', Validators.required),
      constraints: new FormArray([]),
      subexpressions: new FormArray([]),
    });
  }

  //////////////////////////////////////////
  handleExpressionTypeChange(formGroup: FormGroup) {
    console.log(
      'handleExpressionTypeChange',
      formGroup.get('expressionType')!.value,
    );
    const expressionTypeControl = this.formGroup.get('expressionType');
    if (expressionTypeControl) {
      expressionTypeControl.setValue(formGroup.get('expressionType')!.value);
      this.expressionFormChange.emit(this.formGroup);
    }
  }
}
