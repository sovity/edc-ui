import {UiAsset} from '@sovity.de/edc-client';

export namespace TestAssets {
  const markdownDescription = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
  no sea takimata sanctus est Lorem ipsum dolor sit amet.
  
  ![scenery](https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3NrOTc5MS1pbWFnZS1rd3Z1amE5Ni5qcGc.jpg)

  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
  no sea takimata sanctus est Lorem ipsum dolor sit amet.

  ![scenery2](https://live.staticflickr.com/65535/40672257333_d81788a384_b.jpg)

  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
  vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
  no sea takimata sanctus est Lorem ipsum dolor sit amet.

  ![scenery3](https://upload.wikimedia.org/wikipedia/commons/d/dd/Natural_scenery.jpg)
  
  # Omen
  
  This is **bold!** This is _italic_. This is inline \`code\`.
  
  > here we quote

  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
  vero eos et accusam et justo duo dolores et ea rebum.
  
  ## Sage
  
  - list item 1
  - list item 2
  
  ### Raze
  
  1. list item 1
  2. list item 2
  
  #### Cypher
  
  \`\`\`javascript
  alert(1);
  \`\`\`
  
  ##### Jett
  
  [Sovity Website](https://sovity.de/)
  
  **Table**
| Item              | In Stock | Price | Description |
| :---------------- | :------: | ----: | :---------- |
| Python Hat        |   True   | 24.99 | This is a long description to test the scrolling behavior of the table. |
| SQL Hat           |   True   | 24.99 | This is a long description to test the scrolling behavior of the table. |
| Codecademy Tee    |  False   | 20.99 | This is a long description to test the scrolling behavior of the table. |
| Codecademy Hoodie |  False   | 43.99 | This is a long description to test the scrolling behavior of the table. |
`;

  export const boring: UiAsset = {
    assetId: 'data-sample-ckd-skd-demands-2023-Jan',
    title: 'data-sample-ckd-skd-demands-2023-Jan',
    connectorEndpoint: 'https://my-other-connector/api/dsp',
    participantId: 'MDSL1234XX.C1234XX',
    creatorOrganizationName: 'my-other-connector',
  };

  export const full: UiAsset = {
    assetId: 'ckd-skd-demands-2023-Jan',
    title: 'CKD / SKD Demands January 2023',
    connectorEndpoint: 'https://my-other-connector/api/dsp',
    participantId: 'MDSL1234XX.C1234XX',
    version: '2023-A-Program',
    creatorOrganizationName: 'My-German-OEM',
    keywords: ['automotive', 'part-demands', '2023', 'January'],
    mediaType: 'application/json',
    description: markdownDescription,
    descriptionShortText:
      'Part demands for CKD/SKD parts January 2023 Split by plant / day / model code. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    language: 'https://w3id.org/idsa/code/EN',
    publisherHomepage:
      'https://teamabc.departmentxyz.my-german-oem.de/offers/ckd-skd-demands',
    licenseUrl:
      'https://teamabc.departmentxyz.my-german-oem.de/offers/ckd-skd-demands#license',
    landingPageUrl:
      'https://teamabc.departmentxyz.my-german-oem.de/offers/ckd-skd-demands#documentation',
    dataCategory: 'Infrastructure and Logistics',
    dataSubcategory: 'General Information About Planning Of Routes',
    dataModel: 'unspecified',
    geoReferenceMethod: 'Lat/Lon',
    transportMode: 'Rail',
    httpDatasourceHintsProxyQueryParams: true,
    httpDatasourceHintsProxyPath: true,
    httpDatasourceHintsProxyMethod: true,
    httpDatasourceHintsProxyBody: true,
    additionalProperties: {
      'http://unknown/usecase': 'my-use-case',
    },
    privateProperties: {
      'http://unknown/internal-id': 'my-internal-id-123',
    },
  };

  export function toDummyAsset(entry: UiAsset): UiAsset {
    return {
      assetId: entry.assetId,
      title: entry.assetId,
      participantId: entry.participantId,
      connectorEndpoint: entry.connectorEndpoint,
      creatorOrganizationName: entry.participantId,
    };
  }

  export function withSuffix(asset: UiAsset, suffix: string): UiAsset {
    return {
      ...asset,
      assetId: `${asset.assetId}-${suffix}`,
      title: `${asset.title} ${suffix}`,
    };
  }
}
