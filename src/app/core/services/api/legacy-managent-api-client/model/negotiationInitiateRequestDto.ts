// @ts-nocheck

/**
 * EDC REST API
 * All files merged by open api merger
 *
 * The version of the OpenAPI document: 1.0.0-SNAPSHOT
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import {ContractOfferDescription} from './contractOfferDescription';

export interface NegotiationInitiateRequestDto {
  connectorAddress: string;
  connectorId: string;
  offer: ContractOfferDescription;
  protocol: string;
}
