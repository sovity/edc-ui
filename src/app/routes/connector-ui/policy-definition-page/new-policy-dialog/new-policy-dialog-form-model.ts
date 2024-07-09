import {
  FormControl, // FormGroup,
  ɵFormGroupValue,
} from '@angular/forms';

/**
 * Form Value Type
 */
export type NewPolicyDialogFormValue =
  ɵFormGroupValue<NewPolicyDialogFormModel>;

/**
 * Form Group Template Type
 */
export interface NewPolicyDialogFormModel {
  id: FormControl<string>;
  expression: FormControl<UiPolicyExpression>;
  // range: FormGroup<{
  //   start: FormControl<Date | null>;
  //   end: FormControl<Date | null>;
  // }>;
  // participantIds: FormControl<string[]>;
}

// export type PolicyType =
//   | 'Time-Period-Restricted'
//   | 'Connector-Restricted-Usage';

export type constraintExpression = {
  expressionType: 'CONSTRAINT';
  constraint: Constraint;
};

export type operatorExpression = {
  expressionType: ExressionType;
  expressions: UiPolicyExpression[];
};

export type UiPolicyExpression = constraintExpression | operatorExpression;

// export type UiPolicyExpression = {
//   expressionType: ExressionType;
//   expressions?: UiPolicyExpression[];
//   constraint?: Constraint;
// };

export type Constraint = {
  type: ConstraintType;
  value: string;
};

export type ConstraintType =
  | 'Time-Period-Restricted'
  | 'Connector-Restricted-Usage';

export type ExressionType = 'AND' | 'OR' | 'XOR' | 'CONSTRAINT';
