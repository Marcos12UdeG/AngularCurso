import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { KeycloakService } from 'keycloak-angular';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  private productService = inject(ProductService)
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialog);
  private key = inject(KeycloakService);
  private util = inject(UtilService);
  isAdmin:any;
  
  ngOnInit(): void {
    this.getProducts();
    console.log(this.key.getUserRoles());
    this.isAdmin = this.util.isAdmin();
  }
  
  displayColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public dialog = inject(MatDialog);
  
  getProducts(){
    this.productService.getProducts().subscribe((resp:any) =>{
      console.log("Respuesta productos",resp);
      this.processProduct(resp);
    },(error:any)=>{
      console.log("Respuesta no obtenida",error);
    })
  }
  
  processProduct(resp:any){
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].Codigo == "00") {
      let listProduct = resp.productResponse.productList;
      listProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });
      // Seteamos el dataSource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }


  openProductDialog(){
    const dialogRef = this.dialogRef.open(NewProductComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Producto Agregado", "Exito");
        this.getProducts();
      } else if(result == 2){
        this.openSnackBar("Producto No Agregado", "No Exito");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getProducts();
    }

    this.productService.BuscarProducts(termino).subscribe((resp: any) => {
      this.processProduct(resp);
    });
  }

  edit(id:number,name:string,price:number,account:number,category:any){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width:'650px',
      data: {
        id: id, name:name , price:price, account:account, category:category
      }
  })
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.openSnackBar("Producto Actualizado" , "Exito");
          this.getProducts();
        }else if( result == 2){
          this.openSnackBar("Producto Actualizado", "No Exito");
        }
    });
  }

  delete(id:any){
    const dialog = this.dialog.open(ConfirmComponent,{
      width:"400px",
      data:{id:id,module:"product"}
    })

    dialog.afterClosed().subscribe((resp:any)=>{
      this.openSnackBar("Producto Eliminado","Exito");
      this.getProducts();
    },(error:any)=>{
      this.openSnackBar("Producto No Eliminado","No Exito");
    })
  }
}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
