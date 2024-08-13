import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  GetAllCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  AgregarCategorias(body:any){
    const endpoint = `${base_url}/guardar`;
    return this.http.post(endpoint,body);
  }

  EliminarCategoria(id:any){
    const endpoint = `${base_url}/eliminar/${id}`;
    return this.http.delete(endpoint,id);
  }

  ActualizarCategorias(body:any,id:any){
    const endpoint = `${base_url}/actualizar/${id}`;
    return this.http.put(endpoint,body);
  }

  BuscarPorId(id:any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint,id);
  }

  ObtenerExcel(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint,{
      responseType:'blob'
    });
      
   
  }
}
