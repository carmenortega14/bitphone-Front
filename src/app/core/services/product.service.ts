import { Injectable } from "@angular/core";
import { ServiceBase } from './service-base';
import { environment } from '../../environments/environment';

import { Product } from "../../shared/models/product";
import { ToastrService } from "./toastr.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ServiceBase {


  constructor(protected override http: HttpClient) {
    super(http);
    this.ApiUrl = [environment.ApiUrl].join('/');
  }

  private carritoItems: any[] = [];
  private carrito = new BehaviorSubject<any[]>([]);

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

  obtenerPedidos() {
    return this.http.get<any[]>(`${this.ApiUrl}/pedidos`).pipe(
      map(pedidos => this.procesarUrlsImagenes(pedidos))
    );
  }

  private procesarUrlsImagenes(pedidos: any[]): any[] {
    return pedidos.map(pedido => {
      if (pedido.items) {
        pedido.items = pedido.items.map((item: any) => {
          if (item.celular?.imagenUrl) {
            item.celular.imagenUrl = this.fixImageUrl(item.celular.imagenUrl);
          }
          return item;
        });
      }
      return pedido;
    });
  }

  private fixImageUrl(url: string): string {
    if (!url) return 'assets/default-phone.png';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads')) return `${environment.ApiUrl}${url}`;
    return url;
  }

  obtenerPedidoPorId(id: number): Observable<any> {
    const url = `${this.ApiUrl}/pedidos/${id}`;
    return this.http.get<any>(url);
  }

  actualizarPedido(id: number, pedido: any): Observable<any> {
    const url = `${this.ApiUrl}/pedidos/${id}`;
    return this.http.put<any>(url, pedido);
  }

  carrito$ = this.carrito.asObservable();

  agregarAlCarrito(item: any): void {
    const itemExistente = this.carritoItems.find(i => i.celularId === item.celularId);

    if (itemExistente) {
      itemExistente.cantidad += item.cantidad;
    } else {
      this.carritoItems.push(item);
    }

    this.guardarCarrito();
    this.carrito.next([...this.carritoItems]);
  }

  private guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carritoItems));
  }

  private cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoItems = JSON.parse(carritoGuardado);
      this.carrito.next([...this.carritoItems]);
    }
  }

  actualizarStockCelular(celularId: number, nuevoStock: number): Observable<any> {
    const url = `${this.ApiUrl}/celulares/${celularId}/stock`;
    return this.http.patch(url, { stock: nuevoStock });
  }

  eliminarDelCarrito(celularId: number): void {
    this.carritoItems = this.carritoItems.filter(item => item.celularId !== celularId);
    this.guardarCarrito();
    this.carrito.next([...this.carritoItems]);
  }

  actualizarItem(itemActualizado: any): void {
    const index = this.carritoItems.findIndex(item => item.celularId === itemActualizado.celularId);
    if (index !== -1) {
      this.carritoItems[index] = itemActualizado;
      this.guardarCarrito();
      this.carrito.next([...this.carritoItems]);
    }
  }

  getCartItemCount(): number {
    return this.carritoItems.reduce((total, item) => total + item.cantidad, 0);
  }

  // En cart.service.ts
  getCantidadEnCarrito(celularId: number): number {
    const item = this.carritoItems.find(i => i.celularId === celularId);
    return item ? item.cantidad : 0;
  }

  vaciarCarrito(): void {
    this.carritoItems = [];
    this.guardarCarrito();
    this.carrito.next([...this.carritoItems]);
  }
}

export class FavouriteProduct {
  // product: Product;
  // productId: string;
  // userId: string;
}
