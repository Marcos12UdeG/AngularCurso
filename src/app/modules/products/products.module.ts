import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    
  ]
})
export class ProductsModule { }
