export class LocalStorageUtils {
  saveData<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(
    key: string,
    defaultValue: T,
    isValidValue: (value?: unknown) => boolean,
  ): T {
    const data = this.getDataUnsafe<T>(key, defaultValue);
    if (!isValidValue(data)) {
      return defaultValue;
    }
    return data;
  }

  private getDataUnsafe<T>(key: string, defaultValue: T): T {
    const storedItem = localStorage.getItem(key);

    try {
      return storedItem == null ? defaultValue : (JSON.parse(storedItem) as T);
    } catch (e) {
      console.warn('Error parsing local storage value', key, storedItem);
      return defaultValue;
    }
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
