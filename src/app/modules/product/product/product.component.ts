import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  private productService = inject(ProductService)
  private snackBar = inject(MatSnackBar);
  private dialoRef = inject(MatDialog);
  ngOnInit(): void {
    this.getProducts();
  }
  displayColumns: string[] = ['id', 'name', 'price', 'account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public dialog = inject(MatDialog);
  getProducts(){
    this.productService.getProducts().subscribe( (data:any) =>{
      console.log("Respuesta de productos:",data);
      this.processProduct(data);
    }, (error:any) => {
      console.log("Error en producto",error);
    }
  )}

  processProduct(resp:any){
    const dataProduct: ProductElement[] = [];
    if(resp.metadata[0].Codigo == "00"){
      let listProduct = resp.productResponse.productList;
      listProduct.forEach((element:ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/png;base64, '+ element.picture;
        dataProduct.push(element);
      });
      //seteamos el dataSource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }


  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Producto Agregado", "Exito");
        this.getProducts();
      }else if( result == 2){
        this.openSnackBar("Producto No Agregado", "No Exito");
      }
    })
  }

  openSnackBar(message: string,action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      
      duration:2000
    });
  
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getProducts();
    }

    this.productService.BuscarProducts(termino)
    .subscribe((rest:any) => {
        this.processProduct(rest);
    }
  )
  }
}
export interface ProductElement{
  id:number,
  name:string,
  price:number,
  account:number,
  category:any,
  picture:any
}