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

    return storedItem == null ? null : JSON.parse(storedItem);
  }
  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearData() {
    localStorage.clear();
  }
}
