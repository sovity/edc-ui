import {Injectable} from '@angular/core';
import {Observable, combineLatest, concat, interval} from 'rxjs';
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
  consumedConnectorLimitsData!: string;

  constructor(
    private edcApiService: EdcApiService,
    private contractAgreementCardMappedService: ContractAgreementCardMappedService,
    private activeFeatureSet: ActiveFeatureSet,
  ) {}

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
    return this.edcApiService.getContractAgreementPage().pipe(
      Fetched.wrap({failureMessage: 'Failed fetching contract definitions'}),
      Fetched.map((contractAgreementPage) =>
        this.buildContractAgreementPageData(contractAgreementPage),
      ),
    );
  }

  private fetchConnectorLimitsData(): Observable<ConnectorLimits> {
    return this.edcApiService.getEnterpriseEditionConnectorLimits().pipe(
      Fetched.wrap({failureMessage: 'Failed fetching connector limits'}),
      Fetched.map((connectorLimits) => connectorLimits),
    );
  }

  private buildContractAgreementPageData(
    contractAgreementPage: ContractAgreementPage,
  ): ContractAgreementPageData {
    if (this.activeFeatureSet.hasEnterPriseEditionFields() || true) {
      this.fetchConnectorLimitsData().subscribe((data) =>
        data.match({
          ifOk: (value) => {
            this.consumedConnectorLimitsData = 'test';
            console.log('data is.......' + this.consumedConnectorLimitsData);
            //value.numActiveConsumingContractAgreements.toString() +
            //'/' +
            //value.maxActiveConsumingContractAgreements!.toString()
          },
          ifError: (data) => console.log(data),
          ifLoading: () => {
            this.consumedConnectorLimitsData = 'Loading...';
          },
        }),
      );
    }
    console.log('before map' + this.consumedConnectorLimitsData);
    let contractAgreements = this.mapContractAgreements(
      contractAgreementPage.contractAgreements,
      this.consumedConnectorLimitsData!!,
    );
    return {
      contractAgreements,
      consumingContractAgreements: contractAgreements.filter(
        (it) => it.direction === 'CONSUMING',
      ),
      providingContractAgreements: contractAgreements.filter(
        (it) => it.direction === 'PROVIDING',
      ),
      numTotalContractAgreements:
        contractAgreementPage.contractAgreements.length,
    };
  }

  private mapContractAgreements(
    contractAgreements: ContractAgreementCard[],
    consumedConnectorLimit: string,
  ): ContractAgreementCardMapped[] {
    return contractAgreements.map((contractAgreement) =>
      this.contractAgreementCardMappedService.buildContractAgreementCardMapped(
        contractAgreement,
        consumedConnectorLimit,
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
}
