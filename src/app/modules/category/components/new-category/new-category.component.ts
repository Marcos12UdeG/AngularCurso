import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

estadoFormulario:string = "";

private categorySe = inject(CategoryService)
private dialogRef = inject(MatDialogRef<NewCategoryComponent>)
public data = inject(MAT_DIALOG_DATA);
public categoryForm!: FormGroup;
private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.estadoFormulario = "Agregar"
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    if(this.data != null){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }
  }

  onSave() : void{
    
    let data = {
      name: this.categoryForm.get('name') ?.value,
      description: this.categoryForm.get('description')?.value
    }

if(this.data != null){
  this.categorySe.ActualizarCategorias(data,this.data.id)
  .subscribe((data: any) =>{
    this.dialogRef.close(1);
  },(error : any)=>{
    this.dialogRef.close(2);
  }

)
}else{
  this.categorySe.AgregarCategorias(data)
    .subscribe(data =>{
      console.log(data);
      this.dialogRef.close(1)
    },
    (error:any) =>{
      console.log(error);
      this.dialogRef.close(2);
    }
    )
}
  }

  onCancel() : void{
    this.dialogRef.close(3);
  }


  updateForm(data :any){
    
    this.categoryForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
  });

  
}
}
