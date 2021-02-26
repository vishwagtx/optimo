import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemData } from '../interfaces/itemData';
import { ItemDetailData } from '../interfaces/itemDetailData';

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemData> {
    return this.http.get<ItemData>(
      `test/items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active`
    );
  }

  getSearchItems(keyword: string): Observable<ItemData> {
    return this.http.get<ItemData>(
      `test/items/?fields=id,name,description,ItemCategory,DefaultPriceConcessionID,DefaultPriceConcessionName,active&SearchText=${keyword}`
    );
  }

  getItemDetailById(id: number): Observable<ItemDetailData> {
    return this.http
      .get<any>(
        `test/items/${id}?include=itempricegroups,pricegroups&priceconcessionid=1`
      )
      .pipe(map((m: any) => m.Data));
  }
}
