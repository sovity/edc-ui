import {Injectable} from '@angular/core';
import {Observable, combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UiContractOffer, UiDataOffer} from '@sovity.de/edc-client';
import {CatalogApiUrlService} from '../../../../core/services/api/catalog-api-url.service';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {AssetPropertyMapper} from '../../../../core/services/asset-property-mapper';
import {Fetched} from '../../../../core/services/models/fetched';
import {MultiFetched} from '../../../../core/services/models/multi-fetched';
import {assetSearchTargets, search} from '../../../../core/utils/search-utils';
import {
  CatalogBrowserPageData,
  ContractOfferRequest,
} from './catalog-browser-page.data';

@Injectable({providedIn: 'root'})
export class CatalogBrowserPageService {
  constructor(
    private edcApiService: EdcApiService,
    private assetPropertyMapper: AssetPropertyMapper,
    private catalogApiUrlService: CatalogApiUrlService,
  ) {}

  contractOfferPageData$(
    refresh$: Observable<any>,
    searchText$: Observable<string>,
  ): Observable<CatalogBrowserPageData> {
    return combineLatest([
      refresh$.pipe(switchMap(() => this.fetchCatalogs())),
      searchText$,
    ]).pipe(
      map(([data, searchText]): CatalogBrowserPageData => {
        // Merge fetch results
        const contractOffers = data.requestTotals.data.flat();
        // Apply filter
        const filteredContractOffers = this.filterContractOffers(
          contractOffers,
          searchText,
        );

        return {
          requests: data.requests,
          requestTotals: data.requestTotals,
          filteredContractOffers,
          numTotalContractOffers: contractOffers.length,
        };
      }),
    );
  }

  filterContractOffers(
    dataOffers: UiDataOffer[],
    searchText: string,
  ): UiContractOffer[] {
    const dataoffersResult = search(dataOffers, searchText, (dataOffer) =>
      assetSearchTargets(
        this.assetPropertyMapper.buildAsset({
          connectorEndpoint: dataOffer.endpoint,
          uiAsset: dataOffer.asset,
        }),
      ),
    );
    return dataoffersResult.flatMap((dataOffer) => dataOffer.contractOffers);
  }

  fetchCatalogs(): Observable<
    Pick<CatalogBrowserPageData, 'requests' | 'requestTotals'>
  > {
    // Prepare to fetch individual Catalogs
    const urls = this.catalogApiUrlService.getAllProviders();
    const sources = urls.map((it) =>
      this.edcApiService
        .getCatalogPageDataOffers(it)
        .pipe(Fetched.wrap({failureMessage: 'Failed fetching catalog.'})),
    );

    return combineLatest(sources).pipe(
      map((results) => MultiFetched.aggregate(results)),
      map(
        (
          requestTotals: MultiFetched<UiDataOffer[]>,
        ): Pick<CatalogBrowserPageData, 'requests' | 'requestTotals'> => {
          const presetUrls = this.catalogApiUrlService.getPresetProviders();
          return {
            requestTotals,
            requests: requestTotals.results.map(
              (data, index): ContractOfferRequest => ({
                url: urls[index],
                isPresetUrl: presetUrls.includes(urls[index]),
                data,
              }),
            ),
          };
        },
      ),
    );
  }
}
