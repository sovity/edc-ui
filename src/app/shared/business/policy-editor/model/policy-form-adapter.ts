import {UntypedFormControl, Validators} from '@angular/forms';
import {UiPolicyConstraint, UiPolicyLiteral} from '@sovity.de/edc-client';
import {format} from 'date-fns-tz';
import {jsonValidator} from '../../../../core/validators/json-validator';
import {
  readArrayLiteral,
  readJsonLiteral,
  readSingleStringLiteral,
  stringLiteral,
} from './policy-jsonld-utils';
import {PolicyOperatorConfig} from './policy-operators';

export interface PolicyFormAdapter<T> {
  displayText: (value: UiPolicyLiteral) => string | null;
  fromControlFactory: () => UntypedFormControl;
  buildFormValueFn: (literal: UiPolicyLiteral) => T;
  buildValueFn: (
    formValue: T,
    operator: PolicyOperatorConfig,
  ) => UiPolicyLiteral;
  emptyConstraintValue: () => Pick<UiPolicyConstraint, 'right' | 'operator'>;
}

export const localDateAdapter: PolicyFormAdapter<Date | null> = {
  displayText: (literal): string | null => {
    const value = readSingleStringLiteral(literal);
    try {
      if (!value) {
        return value;
      }
      return format(new Date(value), 'dd/MM/yyyy');
    } catch (e) {
      return '' + value;
    }
  },
  fromControlFactory: () => new UntypedFormControl(null, Validators.required),
  buildFormValueFn: (literal): Date | null => {
    const value = readSingleStringLiteral(literal);
    try {
      if (!value) {
        return null;
      }
      return new Date(value);
    } catch (e) {
      return null;
    }
  },
  buildValueFn: (value) => stringLiteral(value?.toISOString()),
  emptyConstraintValue: () => ({
    operator: 'LT',
    right: {
      type: 'STRING',
    },
  }),
};

export const stringAdapter: PolicyFormAdapter<string> = {
  displayText: (literal): string | null =>
    readSingleStringLiteral(literal) ?? '',
  fromControlFactory: () => new UntypedFormControl('', Validators.required),
  buildFormValueFn: (literal): string => readSingleStringLiteral(literal) ?? '',
  buildValueFn: (value) => stringLiteral(value),
  emptyConstraintValue: () => ({
    operator: 'EQ',
    right: {
      type: 'STRING',
      value: '',
    },
  }),
};

export const stringArrayOrCommaJoinedAdapter: PolicyFormAdapter<string[]> = {
  displayText: (literal): string | null => readArrayLiteral(literal).join(', '),
  fromControlFactory: () => new UntypedFormControl([], Validators.required),
  buildFormValueFn: (literal): string[] => {
    if (literal.type === 'STRING') {
      return literal.value?.split(',') ?? [];
    }

    return readArrayLiteral(literal);
  },
  buildValueFn: (value, operator) => {
    const items = value as string[];
    if (operator.id === 'EQ') {
      return {
        type: 'STRING',
        value: items.join(','),
      };
    }

    return {
      type: 'STRING_LIST',
      valueList: items,
    };
  },
  emptyConstraintValue: () => ({
    operator: 'IN',
    right: {
      type: 'STRING_LIST',
      valueList: [],
    },
  }),
};

export const jsonAdapter: PolicyFormAdapter<string> = {
  displayText: (literal) => readJsonLiteral(literal),
  buildFormValueFn: (literal) => readJsonLiteral(literal),
  buildValueFn: (formValue) => ({
    type: 'JSON',
    value: formValue,
  }),
  fromControlFactory: () =>
    new UntypedFormControl('', [Validators.required, jsonValidator]),
  emptyConstraintValue: () => ({
    operator: 'EQ',
    right: {
      type: 'JSON',
      value: 'null',
    },
  }),
};
