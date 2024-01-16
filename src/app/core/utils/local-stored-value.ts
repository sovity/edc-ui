import {LocalStorageUtils} from './local-storage-utils';

export class LocalStoredValue<T> {
  localStorageUtils = new LocalStorageUtils();
  cachedValue: T;

  constructor(
    private defaultValue: T,
    private key: string,
    private isValidValue: (value?: unknown | null) => boolean,
  ) {
    this.cachedValue = this.validOrDefault(this.readValueOrNull());
  }

  get value(): T {
    return this.cachedValue;
  }

  set value(value: T) {
    if (this.cachedValue != value) {
      this.cachedValue = value;
      this.writeValue();
    }
  }

  private writeValue() {
    this.localStorageUtils.saveData(this.key, this.cachedValue);
  }

  private readValueOrNull(): T | null {
    try {
      return this.localStorageUtils.getData(this.key);
    } catch (e) {
      console.warn('Error parsing local storage value', this.key, e);
    }
    return null;
  }

  private validOrDefault(value: T | null): T {
    if (this.isValidValue(value)) {
      return value ?? this.defaultValue;
    }

    return this.defaultValue;
  }
}
