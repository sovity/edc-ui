import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {ContractNegotiationService} from '../../../core/services/contract-negotiation.service';
import {ContractOffer} from '../../../core/services/models/contract-offer';
import {ConnectorEndpointService} from '../connector-endpoint.service';

export interface ContractOffersWithEndpoint {
  contractOffers: ContractOffer[];
  endpoint: string;
}

@Component({
  selector: 'contract-offer-mini-list',
  templateUrl: 'contract-offer-mini-list.component.html',
})
export class ContractOfferMiniListComponent {
  @Input()
  data!: ContractOffersWithEndpoint;

  @HostBinding('class.flex')
  @HostBinding('class.flex-col')
  cls = true;

  @Output()
  negotiateClick = new EventEmitter<ContractOffer>();

  constructor(
    public contractNegotiationService: ContractNegotiationService,
    public connectorEndpointService: ConnectorEndpointService,
  ) {}
}
