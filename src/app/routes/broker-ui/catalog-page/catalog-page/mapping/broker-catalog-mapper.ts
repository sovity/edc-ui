import {Injectable} from '@angular/core';
import {
  CatalogDataOffer,
  CatalogPageResult,
} from '@sovity.de/broker-server-client';
import {AssetBuilder} from '../../../../../core/services/asset-builder';
import {
  CatalogDataOfferMapped,
  CatalogPageResultMapped,
} from './catalog-page-result-mapped';

@Injectable({providedIn: 'root'})
export class BrokerCatalogMapper {
  constructor(private assetBuilder: AssetBuilder) {}

  buildUiCatalogPageResult(data: CatalogPageResult): CatalogPageResultMapped {
    return {
      ...data,
      dataOffers: data.dataOffers.map((offer) => this.buildUiDataOffer(offer)),
    };
  }

  private buildUiDataOffer(offer: CatalogDataOffer): CatalogDataOfferMapped {
    return {
      ...offer,
      asset: this.assetBuilder.buildAsset(offer.asset),
    };
  }
}
