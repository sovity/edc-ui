import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BrokerViewSelectionService {
  defaul_view = 'grid';
  view_storage_key = 'brokerui.view';
  constructor(private localStorageService: LocalStorageService) {}

  public getView() {
    return (
      this.localStorageService.getData(this.view_storage_key) ??
      this.defaul_view
    );
  }

  public setView(view: string) {
    this.localStorageService.saveData(this.view_storage_key, view);
  }
}
