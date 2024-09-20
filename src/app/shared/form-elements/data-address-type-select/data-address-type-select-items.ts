import {ActiveFeatureSet} from 'src/app/core/config/active-feature-set';
import {DataAddressTypeSelectItem} from './data-address-type-select-item';
import {DataAddressTypeSelectMode} from './data-address-type-select-mode';

export const dataAddressTypeSelectItems = (
  type: DataAddressTypeSelectMode,
  activeFeatureSet: ActiveFeatureSet,
): DataAddressTypeSelectItem[] => {
  const items: DataAddressTypeSelectItem[] = [];

  if (type.startsWith('Datasource') && activeFeatureSet.hasMdsFields()) {
    items.push({
      id: 'On-Request',
      label: '"On Request" Data Offer',
    });
  }

  items.push(
    {
      id: 'Http',
      label: 'REST-API Endpoint',
    },
    {
      id: 'Custom-Data-Address-Json',
      label: `Custom ${type} Config (JSON)`,
    },
  );

  if (type === 'Datasink') {
    items.push({
      id: 'Custom-Transfer-Process-Request',
      label: 'Custom Transfer Process Request (JSON)',
    });
  }

  return items;
};
