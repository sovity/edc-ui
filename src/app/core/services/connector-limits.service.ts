import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {ConnectorLimits} from '@sovity.de/edc-client';
import {EdcApiService} from './api/edc-api.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectorLimitsService {
  private currentSubject = new BehaviorSubject<number | undefined>(undefined);
  private maxSubject = new BehaviorSubject<number | null | undefined>(
    undefined,
  );

  current$ = this.currentSubject.asObservable();
  max$ = this.maxSubject.asObservable();

  constructor(private edcApiService: EdcApiService) {
    this.fetchLimits().subscribe();
  }

  fetchLimits(): Observable<ConnectorLimits> {
    console.log('fetchLimits');
    return this.edcApiService.getEnterpriseEditionConnectorLimits().pipe(
      tap((limits) => {
        this.currentSubject.next(limits.numActiveConsumingContractAgreements);
        this.maxSubject.next(limits.maxActiveConsumingContractAgreements);
      }),
    );
  }

  limitsExceeded(): Observable<boolean> {
    return this.fetchLimits().pipe(
      switchMap(() => this.current$),
      switchMap((current) =>
        this.max$.pipe(
          map((max) => {
            if (max === null || max === undefined) {
              return false;
            } else {
              return current !== undefined && current >= max;
            }
          }),
        ),
      ),
    );
  }

  canNegotiate(): Observable<boolean> {
    console.log('canNegotiate');
    return this.limitsExceeded().pipe(
      map((exceeded) => {
        return !exceeded;
      }),
    );
  }
}
