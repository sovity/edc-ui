import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {ContractAgreementCardMapped} from './contract-agreement-card-mapped';

@Component({
  selector: 'contract-agreement-cards',
  templateUrl: './contract-agreement-cards.component.html',
})
export class ContractAgreementCardsComponent {
  @HostBinding('class.flex')
  @HostBinding('class.flex-wrap')
  @HostBinding('class.gap-[10px]')
  cls = true;

  @Input()
  contractAgreements: ContractAgreementCardMapped[] = [];

  @Output()
  contractAgreementClick = new EventEmitter<ContractAgreementCardMapped>();

  onContractAgreementClick(contractAgreement: ContractAgreementCardMapped) {
    this.contractAgreementClick.emit(contractAgreement);
  }
}
