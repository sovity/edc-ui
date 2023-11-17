import {CnfFilterAttribute} from '@sovity.de/broker-server-client';
import {
  FilterValueSelectItem,
  buildFilterValueSelectItems,
} from './filter-value-select-item';

/**
 * State of a single Filter
 */
export interface FilterValueSelectModel {
  id: string;
  title: string;
  selectedItems: FilterValueSelectItem[];
  availableItems: FilterValueSelectItem[];
  searchText: string;
}

export function buildFilterValueSelectModelWithNewData(
  fetched: CnfFilterAttribute,
  old: FilterValueSelectModel | null,
): FilterValueSelectModel {
  const availableItems = buildFilterValueSelectItems(fetched.values);
  return {
    id: fetched.id,
    title: fetched.title,
    availableItems,
    searchText: old?.searchText ?? '',
    selectedItems: old?.selectedItems ?? [],
  };
}
