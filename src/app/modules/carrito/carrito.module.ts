import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    CarritoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CarritoModule { }
