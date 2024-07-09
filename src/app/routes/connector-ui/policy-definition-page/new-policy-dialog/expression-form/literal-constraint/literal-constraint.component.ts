import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// import { constraintExpression } from '../../new-policy-dialog-form-model';

@Component({
  selector: 'app-literal-constraint',
  templateUrl: './literal-constraint.component.html',
})
export class LiteralConstraintComponent {
  @Output() literalConstraintChange = new EventEmitter<FormGroup>();

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formGroup = new FormGroup({
      expressionType: new FormControl('CONSTRAINT', Validators.required),
      constraint: new FormControl(
        {type: 'Time-Period-Restricted', value: ''},
        Validators.required,
      ),
    });
  }

  //////////////////////////////////////////
  handleConstraintChange(formGroup: FormGroup) {
    // console.log(
    //   'handleConstraintChange',
    //   formGroup.get('Constraint')!.value,
    // );
    // const ConstraintControl = this.formGroup.get('Constraint');
    // if (ConstraintControl) {
    //   ConstraintControl.setValue(formGroup.get('Constraint')!.value);
    //   this.expressionFormChange.emit(this.formGroup);
    // }
  }
}
