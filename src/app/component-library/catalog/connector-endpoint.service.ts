import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from 'src/app/core/config/app-config';

@Injectable({providedIn: 'root'})
export class ConnectorEndpointService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  isOwnEndpoint(endpoint: string) {
    return this.config.connectorEndpoint === endpoint;
  }
}
