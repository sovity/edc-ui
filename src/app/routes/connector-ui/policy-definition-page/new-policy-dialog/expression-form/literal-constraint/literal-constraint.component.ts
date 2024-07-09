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

  changeType($event: any) {
    console.log('changeType', $event);
    this.formGroup.get('constraint')!.patchValue({
      type: $event.value,
    });
  }

  changeStartDate($event: any) {
    console.log('changeDateRange', $event);
    this.formGroup.get('constraint')!.patchValue({
      type: this.formGroup.get('constraint')!.value.type,
      value: {
        ...this.formGroup.get('constraint')!.value.value,
        start: $event.value,
      },
    });
  }

  changeEndDate($event: any) {
    console.log('changeDateRange', $event);
    this.formGroup.get('constraint')!.patchValue({
      type: this.formGroup.get('constraint')!.value.type,
      value: {
        ...this.formGroup.get('constraint')!.value.value,
        end: $event.value,
      },
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
