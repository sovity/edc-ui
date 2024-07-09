import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

// import { constraintExpression } from '../../new-policy-dialog-form-model';

@Component({
  selector: 'app-literal-constraint',
  templateUrl: './literal-constraint.component.html',
})
export class LiteralConstraintComponent implements OnDestroy {
  @Output() literalConstraintChange = new EventEmitter<FormGroup>();

  formGroup: FormGroup = new FormGroup({
    expressionType: new FormControl('CONSTRAINT', Validators.required),
    constraint: new FormControl(
      {type: 'Time-Period-Restricted', value: ''},
      Validators.required,
    ),
  });

  private constraintChangesSubscription: Subscription;

  constructor() {
    this.constraintChangesSubscription = this.formGroup.valueChanges.subscribe(
      () => {
        this.literalConstraintChange.emit(this.formGroup);
      },
    );
  }

  ngOnDestroy() {
    this.constraintChangesSubscription.unsubscribe();
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
