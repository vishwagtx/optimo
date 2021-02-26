import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from '../core/header-nav/header-nav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [RouterModule, HeaderNavComponent],
})
export class CoreModule {}
