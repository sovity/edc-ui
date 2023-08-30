import {UiPolicyDto} from '@sovity.de/edc-client';

export namespace TestPolicies {
  export const connectorRestricted: UiPolicyDto = {
    policyJsonLd: '{"example-policy-jsonld": true}',
    constraints: [
      {
        left: 'REFERRING_CONNECTOR',
        operator: 'EQ',
        right: {type: 'STRING', value: 'https://my-other-connector'},
      },
    ],
    errors: [],
  };

  export const warnings: UiPolicyDto = {
    policyJsonLd: '{"example-policy-jsonld": true}',
    constraints: [
      {
        left: 'SOME_UNKNOWN_PROP',
        operator: 'HAS_PART',
        right: {type: 'STRING_LIST', valueList: ['A', 'B', 'C']},
      },
    ],
    errors: ['$.duties: Duties are currently unsupported.'],
  };
  export const failedMapping: UiPolicyDto = {
    policyJsonLd: '{"example-policy-jsonld": true}',
    constraints: [],
    errors: ['No constraints found!'],
  };
}
