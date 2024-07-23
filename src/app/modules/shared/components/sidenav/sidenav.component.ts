import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home",route: "home", icon:"home"},
    {name: "Categorias",route: "category", icon:"category"},
    {name: "Productos",route: "products", icon:"production_quantity_limits"},
    {name: "Ayuda",route: "ayuda", icon:"help"}

  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
