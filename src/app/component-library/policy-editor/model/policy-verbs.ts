import {UntypedFormControl, Validators} from '@angular/forms';
import {OperatorDto, UiPolicyLiteral} from '@sovity.de/edc-client';
import {format} from 'date-fns-tz';
import {policyLeftExpressions} from './policy-left-expressions';
import {
  PolicyOperatorConfig,
  SUPPORTED_POLICY_OPERATORS,
} from './policy-operators';

export interface PolicyVerbConfig {
  operandLeftId: string;
  operandLeftTitle: string;
  operandLeftDescription: string;
  operandRightType: 'DATE' | 'TEXT';
  operandRightHint?: string;
  operandRightPlaceholder?: string;
  operandRightDisplayTextFn: (
    value: string | null | undefined,
  ) => string | null | undefined;
  supportedOperators: OperatorDto[];
  fromControlFactory: () => UntypedFormControl;
  buildFormValueFn: (literal: UiPolicyLiteral) => unknown;
  buildValueFn: (
    formValue: unknown,
    operator: PolicyOperatorConfig,
  ) => UiPolicyLiteral;
  emptyValue: () => UiPolicyLiteral;
}

export const SUPPORTED_POLICY_VERBS: PolicyVerbConfig[] = [
  {
    operandLeftId: policyLeftExpressions.policyEvaluationTime,
    operandLeftTitle: 'Evaluation Time',
    operandLeftDescription:
      'Time at which the policy is evaluated. This can be used to restrict the data offer to certain time periods',
    supportedOperators: ['GEQ', 'LEQ', 'GT', 'LT'],
    operandRightType: 'DATE',
    operandRightPlaceholder: 'MM/DD/YYYY',
    operandRightHint: 'MM/DD/YYYY',
    operandRightDisplayTextFn: (value) => tryParseDate(value),
    fromControlFactory: () => new UntypedFormControl(null, Validators.required),
    buildFormValueFn: (literal) =>
      literal.value ? new Date(literal.value) : null,
    buildValueFn: (value) => ({
      type: 'STRING',
      value: new Date(value as string).toISOString(),
    }),
    emptyValue: () => ({type: 'STRING', value: ''}),
  },
  {
    operandLeftId: policyLeftExpressions.referringConnector,
    operandLeftTitle: 'Participant ID',
    operandLeftDescription:
      'Participant ID, also called Connector ID, of the counter-party connector.',
    operandRightType: 'TEXT',
    supportedOperators: ['EQ'],
    operandRightPlaceholder: 'MDSL1234XX.C1234YY',
    operandRightHint: 'Multiple values can be joined by comma',
    operandRightDisplayTextFn: (value) => value,
    fromControlFactory: () => new UntypedFormControl(null, Validators.required),
    buildFormValueFn: (literal) => literal.value,
    buildValueFn: (value) => ({
      type: 'STRING',
      value: new Date(value as string).toISOString(),
    }),
    emptyValue: () => ({type: 'STRING', value: ''}),
  },
];

function tryParseDate(value: string | null | undefined) {
  try {
    if (!value) {
      return value;
    }
    return format(new Date(value), 'yyyy-MM-dd');
  } catch (e) {
    // default to value
    return value;
  }
}

export const defaultPolicyVerbConfig = (verb: string): PolicyVerbConfig => ({
  operandLeftId: verb,
  operandLeftTitle: verb,
  operandLeftDescription: '',
  supportedOperators: SUPPORTED_POLICY_OPERATORS.map((it) => it.id),
  operandRightType: 'TEXT',
  operandRightDisplayTextFn: (value) => value,
  fromControlFactory: () => new UntypedFormControl(null),
  buildFormValueFn: (literal) => literal.value,
  buildValueFn: (value) => ({
    type: 'STRING',
    value: value as string,
  }),
  emptyValue: () => ({type: 'STRING', value: ''}),
});
