import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfigService} from '../../app/config/app-config.service';
import {LastCommitInfo} from '../models/last-commit-info';

@Injectable({
  providedIn: 'root',
})
export class LastCommitInfoService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
  ) {}

  getLastCommitInfoData(): Observable<LastCommitInfo> {
    const url = `${this.appConfigService.config.managementApiUrl}/last-commit-info`;
    return this.http.get<LastCommitInfo>(url);
  }

  getUiCommitDetails(): Observable<String> {
    const path = '/assets/config/version.txt';
    return this.http.get(path, {responseType: 'text'});
  }

  getUiBuildDateDetails(): Observable<String> {
    const path = '/assets/config/ui-build-date.txt';
    return this.http.get(path, {responseType: 'text'});
  }
}
