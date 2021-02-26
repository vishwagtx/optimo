import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Item } from './interfaces/item';
import { ItemPriceComponent } from './item-price/item-price.component';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  items$: Observable<Array<Item>>;
  displayedColumns: string[] = ['id', 'name', 'priceConcession', 'price'];

  private sub: Subscription;
  @ViewChild('searchInput')
  input: ElementRef;

  constructor(private itemsService: ItemsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.items$ = this.getItems();
  }

  ngAfterViewInit(): void {
    this.sub = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((m) => m.target.value),
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value) {
          this.items$ = this.getSearchItems(value);
        } else {
          this.items$ = this.getItems();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getItems(): Observable<Array<Item>> {
    return this.itemsService.getItems().pipe(map((m) => m.Data));
  }

  private getSearchItems(keyword: string): Observable<Array<Item>> {
    return this.itemsService.getSearchItems(keyword).pipe(map((m) => m.Data));
  }

  viewPrice(id: number): void {
    this.dialog.open(ItemPriceComponent, {
      data: id,
    });
  }
}
