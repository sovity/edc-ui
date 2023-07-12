export interface TransferProcessDto {
  id: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  state: string;
  contractAgreementId: string;
  direction: string;
  counterPartyConnectorEndpoint: string;
  assetName: string;
  assetId: string;
  errorMessage?: string;
}
