import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_CONFIG, AppConfig} from '../config/app-config';
import {AssetDto} from './models/asset-dto';

@Injectable({
  providedIn: 'root',
})
export class TransferProcessAssetDetailsService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) public config: AppConfig,
  ) {}

  getTransferProcessAssetDetails(
    transferProcessId: string,
  ): Observable<AssetDto> {
    const url = `${this.config.managementApiUrl}/transfer-history-page/transfer-processes/${transferProcessId}/asset`;
    return this.http.get<AssetDto>(url);
  }
}
