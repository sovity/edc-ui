import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConnectorLimits} from '@sovity.de/edc-client';
import {ActiveFeatureSet} from '../config/active-feature-set';
import {EdcApiService} from './api/edc-api.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectorLimitsService {
  constructor(
    private edcApiService: EdcApiService,
    private activeFeatureSet: ActiveFeatureSet,
  ) {}

  fetchLimits(): Observable<ConnectorLimits> {
    return this.edcApiService.getEnterpriseEditionConnectorLimits();
  }

  limitExceeded(): Observable<boolean> {
    return this.fetchLimits().pipe(
      map((limits) => {
        if (
          limits.maxActiveConsumingContractAgreements === null ||
          limits.maxActiveConsumingContractAgreements === undefined
        ) {
          return false;
        }
        return (
          limits.numActiveConsumingContractAgreements >=
          limits.maxActiveConsumingContractAgreements
        );
      }),
    );
  }

  canNegotiate(): Observable<boolean> {
    if (!this.activeFeatureSet.hasConnectorLimits()) {
      return of(true);
    }

    return this.limitExceeded().pipe(
      map((exceeded) => {
        return !exceeded;
      }),
    );
  }
}
