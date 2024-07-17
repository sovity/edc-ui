import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, concat, distinctUntilChanged, Observable, of, share, Subject,} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {
  AssetDetailDialogDataService
} from 'src/app/component-library/catalog/asset-detail-dialog/asset-detail-dialog-data.service';
import {
  AssetDetailDialogService
} from '../../../../component-library/catalog/asset-detail-dialog/asset-detail-dialog.service';
import {Fetched} from '../../../../core/services/models/fetched';
import {value$} from '../../../../core/utils/form-group-utils';
import {filterNotNull} from '../../../../core/utils/rxjs-utils';
import {ContractAgreementCardMapped} from '../contract-agreement-cards/contract-agreement-card-mapped';
import {ContractAgreementPageData} from './contract-agreement-page.data';
import {ContractAgreementPageService} from './contract-agreement-page.service';
import {ContractTerminationStatus} from "@sovity.de/edc-client";

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
  ) {}

  ngOnInit(): void {
    //this.terminationFilterControl.setValue('all')
    this.fetchContracts();
  }

  fetchContracts() {
    this.page$ = this.contractAgreementPageService
      .contractAgreementPageData$(this.fetch$, 5000, this.searchText$(), this.terminationFilter)
      .pipe(takeUntil(this.ngOnDestroy$), share());
    this.page$.subscribe((contractAgreementList) => {
      this.page = contractAgreementList;
    });
  }

  onTerminationFilterChange() {
    if (this.terminationFilterControl.value === 'all') {
      this.terminationFilter = null;
    } else {
      this.terminationFilter = this.terminationFilterControl.value as ContractTerminationStatus;
    }

    this.fetchContracts()
  }

  onContractAgreementClick(card: ContractAgreementCardMapped) {
    const data$ = this.card$(card.contractAgreementId).pipe(
      map((card) =>
        this.assetDetailDialogDataService.contractAgreementDetails(card),
      ),
    );

    return this.assetDetailDialogService.open(data$, this.ngOnDestroy$);
  }

  refresh() {
    this.fetch$.next(null);
  }

  private card$(
    contractAgreementId: string,
  ): Observable<ContractAgreementCardMapped> {
    return concat(of(this.page), this.page$).pipe(
      filter((fetched) => fetched.isReady),
      map((fetched) => fetched.data),
      map((page) =>
        page.contractAgreements.find(
          (it) => it.contractAgreementId === contractAgreementId,
        ),
      ),
      filterNotNull(),
    );
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
