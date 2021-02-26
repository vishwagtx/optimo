import { PriceGroup } from './priceGroup';

export interface ItemPriceGroup {
  Id: string;
  PriceTypeId: number;
  PriceType: string;
  PriceGroups: PriceGroup;
}
