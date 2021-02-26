import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDetailData } from '../interfaces/itemDetailData';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss'],
})
export class ItemPriceComponent implements OnInit {
  priceGroups = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<ItemPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemsService.getItemDetailById(this.data).subscribe((item) => {
      this.arange(item);
    });
  }

  arange(items: ItemDetailData): void {
    const results = items.ItemPriceGroups.map((m) => m.PriceGroups);
    let priceGroup: any;
    results.forEach((item) => {
      if (!this.priceGroups.some((x) => item.Id === x.Id)) {
        priceGroup = { ...item };
        priceGroup.prices = items.ItemPriceGroups.filter(
          (price) => price.PriceGroups.Id === item.Id
        );
        this.priceGroups.push(priceGroup);
      }
    });
  }
}
