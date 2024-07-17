import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  distinctUntilChanged,
  interval,
  merge,
  of,
  share,
  switchMap,
} from 'rxjs';
import {catchError, map, takeUntil} from 'rxjs/operators';
import {ContractTerminationStatus} from '@sovity.de/edc-client';
import {AssetDetailDialogDataService} from 'src/app/component-library/catalog/asset-detail-dialog/asset-detail-dialog-data.service';
import {AssetDetailDialogService} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog.service';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {Fetched} from '../../../../core/services/models/fetched';
import {value$} from '../../../../core/utils/form-group-utils';
import {ContractAgreementCardMapped} from '../contract-agreement-cards/contract-agreement-card-mapped';
import {ContractAgreementCardMappedService} from '../contract-agreement-cards/contract-agreement-card-mapped.service';
import {ContractAgreementPageData} from './contract-agreement-page.data';
import {ContractAgreementPageService} from './contract-agreement-page.service';

@Component({
  selector: 'app-contract-agreement-page',
  templateUrl: './contract-agreement-page.component.html',
  styleUrls: ['./contract-agreement-page.component.scss'],
})
export class ContractAgreementPageComponent implements OnInit, OnDestroy {
  page: Fetched<ContractAgreementPageData> = Fetched.empty();
  page$: Observable<Fetched<ContractAgreementPageData>> = new Subject();
  searchText = new FormControl<string>('');
  terminationFilterControl: FormControl = new FormControl<string>('ONGOING');

  terminationFilter: ContractTerminationStatus | null = 'ONGOING';

  private fetch$ = new BehaviorSubject(null);

  constructor(
    private assetDetailDialogDataService: AssetDetailDialogDataService,
    private assetDetailDialogService: AssetDetailDialogService,
    private contractAgreementPageService: ContractAgreementPageService,
    private contractAgreementCardMappedService: ContractAgreementCardMappedService,
    private apiService: EdcApiService,
  ) {}

  ngOnInit(): void {
    //this.terminationFilterControl.setValue('all')
    this.fetchContracts();
  }

  fetchContracts() {
    this.page$ = this.contractAgreementPageService
      .contractAgreementPageData$(
        this.fetch$,
        5000,
        this.searchText$(),
        this.terminationFilter,
      )
      .pipe(takeUntil(this.ngOnDestroy$), share());
    this.page$.subscribe((contractAgreementList) => {
      this.page = contractAgreementList;
    });
  }

  onTerminationFilterChange() {
    if (this.terminationFilterControl.value === 'all') {
      this.terminationFilter = null;
    } else {
      this.terminationFilter = this.terminationFilterControl
        .value as ContractTerminationStatus;
    }

    this.fetchContracts();
  }

  onContractAgreementClick(card: ContractAgreementCardMapped) {
    const refresh$ = new Subject();

    const cardUpdates$ = merge(interval(5000), refresh$).pipe(
      switchMap(() =>
        this.apiService
          .getContractAgreementById(card.contractAgreementId)
          .pipe(catchError(() => EMPTY)),
      ),
      map((it) =>
        this.contractAgreementCardMappedService.buildContractAgreementCardMapped(
          it,
        ),
      ),
    );

    const dialogData$ = merge(of(card), cardUpdates$).pipe(
      map((card) =>
        this.assetDetailDialogDataService.contractAgreementDetails(card, () =>
          refresh$.next(undefined),
        ),
      ),
    );

    return this.assetDetailDialogService.open(dialogData$, this.ngOnDestroy$);
  }

  refresh() {
    this.fetch$.next(null);
  }
  private searchText$(): Observable<string> {
    return (value$(this.searchText) as Observable<string>).pipe(
      map((it) => (it ?? '').trim()),
      distinctUntilChanged(),
    );
  }

  ngOnDestroy$ = new Subject();

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
    this.ngOnDestroy$.complete();
  }

  protected readonly value$ = value$;
}
