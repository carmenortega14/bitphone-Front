import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [DatePipe]
})
export class OrdersComponent implements OnInit {

  pedidos: any[] = [];
  pedidoSeleccionado: any = null;
  cargando: boolean = true;

  constructor(
    private ProductService: ProductService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.ProductService.obtenerPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar pedidos', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(pedido: any): void {
    this.pedidoSeleccionado = pedido;
  }

  formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm') || '';
  }

  calcularTotalItems(items: any[]): number {
    return items.reduce((total, item) => total + (item.precioUnitario * item.cantidad), 0);
  }
}
