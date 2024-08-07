import {DataAddressTypeSelectItemLegacy} from './data-address-type-select-item';
import {DataAddressTypeSelectModeLegacy} from './data-address-type-select-mode';

export const dataAddressTypeSelectItemsLegacy = (
  type: DataAddressTypeSelectModeLegacy,
): DataAddressTypeSelectItemLegacy[] => {
  let items: DataAddressTypeSelectItemLegacy[] = [
    {
      id: 'Http',
      label: 'REST-API Endpoint',
    },
    {
      id: 'Custom-Data-Address-Json',
      label: `Custom ${type} Config (JSON)`,
    },
  ];

  if (type === 'Datasink') {
    items.push({
      id: 'Custom-Transfer-Process-Request',
      label: 'Custom Transfer Process Request (JSON)',
    });
  }

  return items;
};
