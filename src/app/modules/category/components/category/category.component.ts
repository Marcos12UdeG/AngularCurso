import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
applyFilter(arg0: string) {
throw new Error('Method not implemented.');
}

  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private categoryService: CategoryService) {}
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.GetAllCategories()
      .subscribe(
        (response: any) => {
          console.log("Respuesta categorias: ", response); // Verifica los datos recibidos en la consola
          this.processCategoriesResponse(response); // Procesa los datos recibidos
        },
        (error: any) => {
          console.error("Error al obtener categorías:", error);
          // Maneja el error según sea necesario
        }
      );
  }

  processCategoriesResponse(response: any): void {
    
  
    if (response && response.metadata && response.metadata.length > 0 &&
        response.metadata[0].code === "00" && response.categoryResponse &&
        response.categoryResponse.categoryList && response.categoryResponse.categoryList.length > 0) {
      const listCategories = response.categoryResponse.categoryList;
      const dataCategory: CategoryElement[] = listCategories.map((category: any) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description
        };
      });
      this.dataSource.data = dataCategory;
      this.dataSource.paginator = this.paginator;
    } else {
      console.error("Error: Respuesta inválida o datos faltantes en la respuesta.", response);
      // Puedes manejar aquí cómo quieres mostrar o tratar el error en tu aplicación
    }
  }

  
  openCategoryDialog(): void{
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Categoria Agregada", "Exito");
        this.getCategories();
      }else if( result == 2){
        this.openSnackBar("Categoria No Agregada", "No Exito ergre");
      }
    })
  }

  edit(id:number,name:string,description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width:'650px',
      data: {
        id: id, name:name , description:description
        
      }
  })
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.openSnackBar("Categoria Actualizada" , "Exito");
          this.getCategories();
        }else if( result == 2){
          this.openSnackBar("Categoria No Actualizada", "No Exito");
        }
    });
  }

  openSnackBar(message: string,action: string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      
      duration:2000
    });
  }
  
  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent,{
      width:"400px",
      data:{id: id}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria Eliminada","Exito");
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar("Categoria No Eliminada", "No Exito")
      }
    })
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getCategories();
    }

    this.categoryService.BuscarPorId(termino).
    subscribe((rest:any) => {
        this.processCategoriesResponse(rest);
    }
  )
  }
  
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
