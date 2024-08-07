import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  private categoryService = inject(CategoryService)
  private porductService = inject(ProductService);
  private dialoRef = inject(MatDialogRef)
  public data = inject(MAT_DIALOG_DATA)
  ngOnInit(): void {
    console.log("Que onda perro");
  }


  onNoClick():void{

    this.dialoRef.close(3)

  }

  delete(){
      if(this.data != null){
        if(this.data.module == "product"){
          this.porductService.EliminarProductos(this.data.id).subscribe((data:any)=>{
            this.dialoRef.close(1);
          },(error)=>{
            this.dialoRef.close(2);
          })
        }else if(this.data.module == "category")
        this.categoryService.EliminarCategoria(this.data.id)
        .subscribe((data:any) =>{
          this.dialoRef.close(1);
        },(error:any) =>{
          this.dialoRef.close(2);
        })
      }else{
        this.dialoRef.close(2);
      }
  }
}
