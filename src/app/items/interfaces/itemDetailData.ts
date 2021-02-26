import { ItemPriceGroup } from './itemPriceGroup';

export interface ItemDetailData {
  Id: string;
  Name: string;
  ItemPriceGroups: Array<ItemPriceGroup>;
}
