import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

type expressionType = 'AND' | 'OR' | 'XOR' | 'CONSTRAINT';

@Component({
  selector: 'app-expression-type-selector',
  templateUrl: './expression-type-selector.component.html',
})
export class ExpressionTypeSelectorComponent implements OnInit {
  @Output() formValueChange = new EventEmitter<FormGroup>();
  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.formGroup = new FormGroup({
      expressionType: new FormControl<expressionType>(
        'CONSTRAINT',
        Validators.required,
      ),
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.formValueChange.emit(this.formGroup);
    });
  }
}
