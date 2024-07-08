import {
  Component, // EventEmitter, Input, Output
  OnInit,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
})
export class ExpressionFormComponent implements OnInit {
  //   @Input() formGroup!: FormGroup;
  //   @Output() remove = new EventEmitter<void>();

  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formGroup = new FormGroup({
      expressionType: new FormControl('', Validators.required),
      constraints: new FormArray([]),
      subexpressions: new FormArray([]),
    });
  }

  //////////////////////////////////////////
  handleFormValueChange(formGroup: FormGroup) {
    this.formGroup.setControl(
      'expressionType',
      formGroup.get('expressionType')!,
    );
  }
}
