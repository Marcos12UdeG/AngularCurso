import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = "http://localhost:8080/api/v2";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(){
    const endpoint =`${url}/Obtener`;
    return this.http.get(endpoint);
  }

  AgregarProducts(body:any){
    const endpoint =`${url}/Agregar`;
    return this.http.post(endpoint,body);
  }

  BuscarProducts(name:any){
    const endpoint =`${url}/nombre/filter/${name}`;
    return this.http.get(endpoint);
  }

  EditarProductos(boyd:any,id:any){
    const endpoint =`${url}/Actualizar/${id}`;
    return this.http.put(endpoint,boyd)
  }


  EliminarProductos(id:any){
    const endpoint =`${url}/eliminar/${id}`;
    return this.http.delete(endpoint,id)
  }

  ObtenerExcel(){
    const endpoint = `${url}/products/export/excel`;
    return this.http.get(endpoint,{
      responseType:'blob'
    });
}
}
