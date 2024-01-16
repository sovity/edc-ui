import {LocalStorageService} from '../services/local-storage.service';

export class LocalStoredValue<T> {
  localStorageService = new LocalStorageService<T>();

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
