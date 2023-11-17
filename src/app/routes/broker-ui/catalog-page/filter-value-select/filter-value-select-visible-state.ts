import {search} from '../../../../core/utils/search-utils';
import {difference} from '../../../../core/utils/set-utils';
import {FilterValueSelectItem} from './filter-value-select-item';
import {FilterValueSelectModel} from './filter-value-select-model';

/**
 * Utility Class for interpreting a {@link FilterValueSelectModel}.
 */
export class FilterValueSelectVisibleState {
  constructor(
    /**
     * Filter ID, required for trackBy
     */
    public id: string,
    /**
     * Available Items + Texts
     */
    public model: FilterValueSelectModel,
    /**
     * Items after applying search
     */
    public visibleItems: FilterValueSelectItem[],
    /**
     * Selected Items
     */
    public selectedIds: Set<string>,
  ) {}

  /**
   * Calculates the visible state from search text, selected items, available items.
   * @param model search text, selected items, available items
   */
  static buildVisibleState(
    model: FilterValueSelectModel,
  ): FilterValueSelectVisibleState {
    const {selectedItems, availableItems, searchText} = model;

    const {selectedIds, allItems} = this.mergeSelectedAndAvailableItems(
      selectedItems,
      availableItems,
    );

    const visibleItems = search(allItems, searchText, (item) => [
      item.id,
      item.label,
    ]);

    return new FilterValueSelectVisibleState(
      model.id,
      model,
      visibleItems,
      selectedIds,
    );
  }

  private static mergeSelectedAndAvailableItems(
    selectedItems: FilterValueSelectItem[],
    availableItems: FilterValueSelectItem[],
  ): {selectedIds: Set<string>; allItems: FilterValueSelectItem[]} {
    const items = new Map<string, FilterValueSelectItem>();
    selectedItems.forEach((item) => items.set(item.id, item));
    availableItems.forEach((item) => items.set(item.id, item));

    const selectedIds = new Set<string>(selectedItems.map((item) => item.id));
    const availableIds = new Set<string>(availableItems.map((item) => item.id));
    const selectedUnavailableItems = [
      ...difference(selectedIds, availableIds),
    ].map((it) => items.get(it)!!);

    // Items that are selected, but not part of the available items should show up first in the list
    const allItems = [...selectedUnavailableItems, ...availableItems];
    return {selectedIds, allItems};
  }

  get numSelectedItems(): number {
    return this.selectedIds.size;
  }

  isSelected(item: FilterValueSelectItem): boolean {
    return this.selectedIds.has(item.id);
  }

  isEqualSelectedItems(items: FilterValueSelectItem[]): boolean {
    return (
      this.selectedIds.size === items.length &&
      items.every((item) => this.selectedIds.has(item.id))
    );
  }
}
