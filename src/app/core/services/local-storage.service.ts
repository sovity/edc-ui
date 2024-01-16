import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  saveData(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): T | null {
    const storedItem = localStorage.getItem(key);

    if (storedItem == null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(key)!);
  }
  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
