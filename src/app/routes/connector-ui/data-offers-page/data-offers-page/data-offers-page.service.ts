import {Injectable} from '@angular/core';
import {Observable, combineLatest, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {AssetService} from '../../../../core/services/asset.service';
import {Fetched} from '../../../../core/services/models/fetched';
import {search} from '../../../../core/utils/search-utils';
import {DataOfferCard} from '../data-offers-cards/data-offer-card';
import {DataOffersCardBuilder} from '../data-offers-cards/data-offers-card-builder';

export interface DataOffersList {
  contractDefinitionCards: DataOfferCard[];
  numTotalContractDefinitions: number;
}

@Injectable({providedIn: 'root'})
export class DataOffersPageService {
  constructor(
    private edcApiService: EdcApiService,
    private assetServiceMapped: AssetService,
    private dataOffersCardBuilder: DataOffersCardBuilder,
  ) {}

  dataOffersPageData$(
    refresh$: Observable<any>,
    searchText$: Observable<string>,
  ): Observable<Fetched<DataOffersList>> {
    return combineLatest([
      refresh$.pipe(switchMap(() => this.fetchCards())),
      searchText$,
    ]).pipe(
      map(([fetchedCards, searchText]) =>
        fetchedCards.map((cards) => ({
          contractDefinitionCards: this.filterCards(cards, searchText),
          numTotalContractDefinitions: cards.length,
        })),
      ),
    );
  }

  filterCards(cards: DataOfferCard[], searchText: string): DataOfferCard[] {
    return search(cards, searchText, (card) => [
      card.id,
      card.accessPolicy.policyDefinitionId,
      card.contractPolicy.policyDefinitionId,
      ...card.criteria.map((it) => it.label),
      ...card.criteria
        .flatMap((it) => it.values)
        .flatMap((it) => it.searchTargets),
    ]);
  }
  //ed
  fetchCards(): Observable<Fetched<DataOfferCard[]>> {
    return combineLatest([
      this.edcApiService.getDataOffersPage(),
      this.assetServiceMapped.fetchAssets().pipe(
        catchError((err) => {
          console.warn('Failed fetching assets.', err);
          return of([]);
        }),
      ),
      this.edcApiService.getPolicyDefinitionPage().pipe(
        map((policyDefinitionPage) => policyDefinitionPage.policies),
        catchError((err) => {
          console.warn('Failed fetching policy definitions.', err);
          return of([]);
        }),
      ),
    ]).pipe(
      map(([dataOffers, assets, policyDefinitions]) =>
        this.dataOffersCardBuilder.buildDataOffersCards(
          dataOffers,
          assets,
          policyDefinitions,
        ),
      ),
      Fetched.wrap({failureMessage: 'Failed fetching data offers'}),
    );
  }
}
