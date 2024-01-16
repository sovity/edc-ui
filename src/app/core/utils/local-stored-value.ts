import {LocalStorageUtils} from './local-storage-utils';

export class LocalStoredValue<T> {
  localStorageService = new LocalStorageUtils();

  constructor(private cachedValue: T, private key: string) {
    this.cachedValue =
      this.localStorageService.getData(this.key) ?? this.cachedValue;
  }

  get value(): T {
    return this.cachedValue;
  }

  set value(value: T) {
    if (this.cachedValue != value) {
      this.cachedValue = value;
      this.localStorageService.saveData(this.key, value);
    }
  }
}
