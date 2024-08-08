import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  chartBar:any;
  chartDou:any;
  private productService = inject(ProductService)

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((resp:any) =>{
      console.log("Respuesta productos",resp);
      this.processProduct(resp);
    },(error:any)=>{
      console.log("Respuesta no obtenida",error);
    })
  }
  
  processProduct(resp:any){
    const nameProduct: String [] = [];
    const account: number [] = [];
    if (resp.metadata[0].Codigo == "00") {
      let listProduct = resp.productResponse.productList;
      listProduct.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        account.push(element.account);
      });

      //grafico de barras
      this.chartBar = new Chart('canvas-bar',{
        type:'bar',
        data:{
          labels: nameProduct,
          datasets: [
            {label:'Productos', data:account},
            
          ]
        }
      });

      this.chartDou = new Chart('canvas-doughnut',{
        type:'doughnut',
        data:{
          labels: nameProduct,
          datasets: [
            {label:'Productos', data:account},
            
          ]
        }
      });
    }
  }


}
