import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
})
export class ExpressionFormComponent {
  @Input() parentGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  get expressionType() {
    return this.parentGroup.get('expressionType');
  }

  get constraints() {
    return this.parentGroup.get('constraints') as FormArray;
  }

  get subexpressions() {
    return this.parentGroup.get('subexpressions') as FormArray;
  }

  onExpressionTypeChange() {
    const expressionType = this.expressionType?.value;

    if (expressionType === 'constraint') {
      this.clearFormArray(this.subexpressions as FormArray);
      if ((this.constraints as FormArray).length === 0) {
        (this.constraints as FormArray).push(
          new FormControl('', Validators.required),
        );
      }
    } else if (['AND', 'OR', 'XOR'].includes(expressionType)) {
      this.clearFormArray(this.constraints as FormArray);
      if ((this.subexpressions as FormArray).length === 0) {
        (this.subexpressions as FormArray).push(
          this.createExpressionFormGroup(),
        );
      }
    }
  }

  addSubexpression() {
    (this.subexpressions as FormArray).push(this.createExpressionFormGroup());
  }

  removeSubexpression(index: number) {
    (this.subexpressions as FormArray).removeAt(index);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  createExpressionFormGroup(): FormGroup {
    return new FormGroup({
      expressionType: new FormControl('', Validators.required),
      constraints: new FormArray([]),
      subexpressions: new FormArray([]),
    });
  }
}
