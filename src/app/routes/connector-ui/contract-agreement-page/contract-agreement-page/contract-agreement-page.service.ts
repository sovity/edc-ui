import {Injectable} from '@angular/core';
import {Observable, combineLatest, concat, interval, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {
  ConnectorLimits,
  ContractAgreementCard,
  ContractAgreementPage,
} from '@sovity.de/edc-client';
import {ActiveFeatureSet} from '../../../../core/config/active-feature-set';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {Fetched} from '../../../../core/services/models/fetched';
import {ContractAgreementCardMapped} from '../contract-agreement-cards/contract-agreement-card-mapped';
import {ContractAgreementCardMappedService} from '../contract-agreement-cards/contract-agreement-card-mapped.service';
import {ContractAgreementPageData} from './contract-agreement-page.data';

@Injectable({providedIn: 'root'})
export class ContractAgreementPageService {
  constructor(
    private edcApiService: EdcApiService,
    private contractAgreementCardMappedService: ContractAgreementCardMappedService,
    private activeFeatureSet: ActiveFeatureSet,
  ) {}

  private consumingContractAgreements: ContractAgreementCardMapped[] = [];

  contractAgreementPageData$(
    refresh$: Observable<any>,
    silentPollingInterval: number,
    searchText$: Observable<string>,
  ): Observable<Fetched<ContractAgreementPageData>> {
    return combineLatest([
      refresh$.pipe(
        switchMap(() =>
          concat(
            this.fetchData(),
            this.silentRefreshing(silentPollingInterval),
          ),
        ),
      ),
      searchText$,
    ]).pipe(
      map(([fetchedData, searchText]) =>
        fetchedData.map((contractAgreementPage) =>
          this.filterContractAgreementPage(contractAgreementPage, searchText),
        ),
      ),
    );
  }

  private fetchData(): Observable<Fetched<ContractAgreementPageData>> {
    return combineLatest([
      this.edcApiService.getContractAgreementPage(),
      this.fetchLimits(),
    ]).pipe(
      map(([contractAgreementPage, connectorLimits]) =>
        this.buildContractAgreementPageData(
          contractAgreementPage,
          connectorLimits,
        ),
      ),
      Fetched.wrap({failureMessage: 'Failed fetching Contract Agreement Page'}),
    );
  }

  private buildContractAgreementPageData(
    contractAgreementPage: ContractAgreementPage,
    connectorLimits: ConnectorLimits | null,
  ): ContractAgreementPageData {
    let contractAgreements = this.mapContractAgreements(
      contractAgreementPage.contractAgreements,
    );

    this.consumingContractAgreements = contractAgreements.filter(
      (it) => it.direction === 'CONSUMING',
    );

    if (connectorLimits) {
      this.setStatus(connectorLimits?.maxActiveConsumingContractAgreements!);
    }

    return {
      contractAgreements,
      consumingContractAgreements: this.consumingContractAgreements,
      providingContractAgreements: contractAgreements.filter(
        (it) => it.direction === 'PROVIDING',
      ),
      numTotalContractAgreements: contractAgreements.length,
    };
  }

  private mapContractAgreements(
    contractAgreements: ContractAgreementCard[],
  ): ContractAgreementCardMapped[] {
    return contractAgreements.map((contractAgreement) =>
      this.contractAgreementCardMappedService.buildContractAgreementCardMapped(
        contractAgreement,
      ),
    );
  }

  private filterContractAgreementPage(
    contractAgreementPage: ContractAgreementPageData,
    searchText: string,
  ): ContractAgreementPageData {
    return {
      ...contractAgreementPage,
      consumingContractAgreements:
        this.contractAgreementCardMappedService.filter(
          contractAgreementPage.consumingContractAgreements,
          searchText,
        ),
      providingContractAgreements:
        this.contractAgreementCardMappedService.filter(
          contractAgreementPage.providingContractAgreements,
          searchText,
        ),
    };
  }

  private silentRefreshing(silentPollingInterval: number) {
    return interval(silentPollingInterval).pipe(
      switchMap(() => this.fetchData()),
      filter((it) => it.isReady),
    );
  }

  private fetchLimits(): Observable<ConnectorLimits | null> {
    if (this.activeFeatureSet.hasConnectorLimits()) {
      return this.edcApiService.getEnterpriseEditionConnectorLimits();
    }
    return of(null);
  }

  private setStatus(maxConnectorLimit: number | null) {
    this.consumingContractAgreements.map((it, index) => {
      if (!maxConnectorLimit || index < maxConnectorLimit!) {
        it.statusText = 'Active';
      } else {
        it.statusText = 'Inactive';
        it.statusTooltipText =
          'This connector has an active limit of consuming contract agreements, causing contract agreements to get disabled if new ones are negotiated.';
      }
    });
  }
}
