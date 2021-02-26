import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsService } from './services/items.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/providers/http-interceptor.service';
import { ItemPriceComponent } from '../items/item-price/item-price.component';

@NgModule({
  declarations: [ItemsComponent, ItemPriceComponent],
  imports: [CommonModule, ItemsRoutingModule, SharedModule],
  providers: [
    ItemsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class ItemsModule {}
