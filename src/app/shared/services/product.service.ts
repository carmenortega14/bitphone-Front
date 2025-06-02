import { Injectable } from "@angular/core";
import { ServiceBase } from './service-base';
import { environment } from '../../environments/environment';

import { Product } from "../models/product";
import { ToastrService } from "./toastr.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ServiceBase {


  constructor(protected override http: HttpClient) {
    super(http);
    this.ApiUrl = [environment.ApiUrl].join('/');
  }

  /** ----------------------------------------------------------------------------------------------------- */

  // Marcas
  crearMarca(marca: any): Observable<any> {
    const url = `${this.ApiUrl}/marcas`;
    return this.http.post<any>(url, marca);
  }

  obtenerMarcas(): Observable<any[]> {
    const url = `${this.ApiUrl}/marcas`;
    return this.http.get<any[]>(url);
  }

  obtenerMarcaPorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/marcas/${id}`;
    return this.http.get<any>(url);
  }

  actualizarMarca(id: number, marca: any): Observable<any> {
    const url = `${this.ApiUrl}/marcas/${id}`;
    return this.http.put<any>(url, marca);
  }

  // Celulares
  crearCelular(celular: any): Observable<any> {
    const url = `${this.ApiUrl}/celulares`;
    return this.http.post<any>(url, celular);
  }

  crearCelularConImagen(celularData: any, imagen: File): Observable<any> {
    const formData = new FormData();

    // Agrega todos los campos del celular
    Object.keys(celularData).forEach(key => {
      formData.append(key, celularData[key]);
    });

    // Agrega la imagen si existe
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post(`${this.ApiUrl}/celulares`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  obtenerCelulares(): Observable<any[]> {
    const url = `${this.ApiUrl}/celulares`;
    return this.http.get<any[]>(url);
  }

  obtenerCelularPorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/celulares/${id}`;
    return this.http.get<any>(url);
  }

  actualizarCelular(id: number, celular: any): Observable<any> {
    const url = `${this.ApiUrl}/celulares/${id}`;
    return this.http.put<any>(url, celular);
  }

  actualizarCelularConImagen(id: number, celular: any, imagen: File): Observable<any> {
    const formData = new FormData();

    // Agrega todos los campos del celular
    Object.keys(celular).forEach(key => {
      formData.append(key, celular[key]);
    });

    // Agrega la imagen
    formData.append('imagen', imagen);

    const url = `${this.ApiUrl}/celulares/${id}/con-imagen`;
    return this.http.put<any>(url, formData);
  }

  // Categorías
  crearCategoria(categoria: any): Observable<any> {
    const url = `${this.ApiUrl}/categorias`;
    return this.http.post<any>(url, categoria);
  }

  obtenerCategorias(): Observable<any[]> {
    const url = `${this.ApiUrl}/categorias`;
    return this.http.get<any[]>(url);
  }

  obtenerCategoriaPorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/categorias/${id}`;
    return this.http.get<any>(url);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    const url = `${this.ApiUrl}/categorias/${id}`;
    return this.http.put<any>(url, categoria);
  }

  // Clientes
  crearCliente(cliente: any): Observable<any> {
    const url = `${this.ApiUrl}/clientes`;
    return this.http.post<any>(url, cliente);
  }

  obtenerClientes(): Observable<any[]> {
    const url = `${this.ApiUrl}/clientes`;
    return this.http.get<any[]>(url);
  }

  obtenerClientePorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/clientes/${id}`;
    return this.http.get<any>(url);
  }

  actualizarCliente(id: number, cliente: any): Observable<any> {
    const url = `${this.ApiUrl}/clientes/${id}`;
    return this.http.put<any>(url, cliente);
  }

  // Pedidos
  crearPedido(pedido: any): Observable<any> {
    const url = `${this.ApiUrl}/pedidos`;
    return this.http.post<any>(url, pedido);
  }

  obtenerPedidos(): Observable<any[]> {
    const url = `${this.ApiUrl}/pedidos`;
    return this.http.get<any[]>(url);
  }

  obtenerPedidoPorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/pedidos/${id}`;
    return this.http.get<any>(url);
  }

  actualizarPedido(id: number, pedido: any): Observable<any> {
    const url = `${this.ApiUrl}/pedidos/${id}`;
    return this.http.put<any>(url, pedido);
  }
}

export class FavouriteProduct {
  // product: Product;
  // productId: string;
  // userId: string;
}
