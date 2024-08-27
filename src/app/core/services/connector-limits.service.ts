import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
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

  isConsumingAgreementLimitExceeded(): Observable<boolean> {
    return this.activeFeatureSet.hasConnectorLimits()
      ? this.edcApiService.getEnterpriseEditionConnectorLimits().pipe(
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
        )
      : of(false);
  }
}
