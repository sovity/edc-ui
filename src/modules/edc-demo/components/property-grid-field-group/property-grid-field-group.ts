import {PropertyGridField} from "../property-grid/property-grid-field";

export interface PropertyGridFieldGroup {
  groupLabel?: string | null;
  properties?: PropertyGridField[];
}
