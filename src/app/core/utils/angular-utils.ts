import {Input, SimpleChange, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * A version of {@link SimpleChanges} with some type safety.
 *
 * Although it doesn't filter input by whether they are decorated by an {@link Input}, it helps
 */
export type SimpleChangesTyped<
  Component extends object,
  Props = ExcludeFunctions<Component>,
> = {
  [Key in keyof Props]: SimpleChange;
};

type MarkFunctionPropertyNames<Component> = {
  [Key in keyof Component]: Component[Key] extends Function | Subject<any>
    ? never
    : Key;
};

type ExcludeFunctionPropertyNames<T extends object> =
  MarkFunctionPropertyNames<T>[keyof T];

type ExcludeFunctions<T extends object> = Pick<
  T,
  ExcludeFunctionPropertyNames<T>
>;
