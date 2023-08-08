import {Inject, Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {
  AssetDto,
  ConnectorLimits,
  ContractAgreementPage,
  ContractAgreementTransferRequest,
  EdcClient,
  IdResponse,
  TransferHistoryPage,
  buildEdcClient,
} from '@sovity.de/edc-client';
import {APP_CONFIG, AppConfig} from '../../config/app-config';

@Injectable({providedIn: 'root'})
export class EdcApiService {
  edcClient: EdcClient;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.edcClient = buildEdcClient({
      managementApiUrl: this.config.managementApiUrl,
      managementApiKey: this.config.managementApiKey,
    });
  }

  getContractAgreementPage(): Observable<ContractAgreementPage> {
    return from(this.edcClient.uiApi.contractAgreementEndpoint());
  }

  initiateTranfer(
    contractAgreementTransferRequest: ContractAgreementTransferRequest,
  ): Observable<IdResponse> {
    return from(
      this.edcClient.uiApi.initiateTransfer({contractAgreementTransferRequest}),
    );
  }

  getTransferHistoryPage(): Observable<TransferHistoryPage> {
    return from(this.edcClient.uiApi.transferHistoryPageEndpoint());
  }

  getTransferProcessAsset(transferProcessId: string): Observable<AssetDto> {
    return from(
      this.edcClient.uiApi.getTransferProcessAsset({transferProcessId}),
    );
  }

  getEnterpriseEditionConnectorLimits(): Observable<ConnectorLimits> {
    return from(this.edcClient.enterpriseEditionApi.connectorLimits());
  }
}
