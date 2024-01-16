export class LocalStorageUtils {
  saveData<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(
    key: string,
    defaultValue: T,
    isValidValue: (value?: unknown | null) => boolean,
  ): T {
    const data = this.getDataOrNull<T>(key) ?? defaultValue;
    if (!isValidValue(data)) {
      return defaultValue;
    }
    return data;
  }

  getDataOrNull<T>(key: string): T | null {
    const storedItem = localStorage.getItem(key);
    try {
      return storedItem == null ? null : JSON.parse(storedItem);
    } catch (e) {
      console.warn('Error parsing local storage value', key, storedItem);
      return null;
    }
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
