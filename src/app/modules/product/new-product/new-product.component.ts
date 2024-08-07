import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';

export interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  estadoFormulario: string = "Agregar Producto";
  categories: Category[] = [];
  productForm!: FormGroup;
  selectdFile: any;
  nameImage: string ="";

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewProductComponent>);
  public data = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });

    if(this.data != null)
      {
        this.updateForm(this.data);
        this.estadoFormulario = "Actualizar";
      }
  }

  ngOnInit(): void {
    this.getCategories();
    this.estadoFormulario;
  }

  onSave(): void {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectdFile
    };
  
    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);
  
    if (this.data && this.data.id) {
      this.productService.EditarProductos(uploadImageData, this.data.id).subscribe((resp: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    } else {
      this.productService.AgregarProducts(uploadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close(3);
  }

  getCategories(): void {
    this.categoryService.GetAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categoryResponse.categoryList;
      },
      (error: any) => {
        console.error("Error al consultar las categorías", error);
      }
    );
  }

  onFileChanged(event:any){
      this.selectdFile = event.target.files[0];
      console.log(this.selectdFile);

      this.nameImage = event.target.files[0].name;
  }

  updateForm(data:any){
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category, Validators.required],
      picture: ['', Validators.required]
    })
  }
}
