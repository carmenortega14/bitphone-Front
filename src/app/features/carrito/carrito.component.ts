import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { AlertService } from "../../core/services/alert.service";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  mostrarModalExito: boolean = false;

  constructor(
    private ProductService: ProductService,
    public router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.ProductService.carrito$.subscribe(items => {
      this.items = items;
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
  }

  // actualizarCantidad(item: any, cantidad: number): void {
  //   if (cantidad < 1) return;
  //   item.cantidad = cantidad;
  //   this.ProductService.actualizarItem(item);
  //   this.calcularTotal();
  // }

  actualizarCantidad(item: any, cantidad: number): void {
    if (cantidad < 1) {
      cantidad = 1; // O eliminar el item
      return;
    }

    // Verificar stock máximo
    if (cantidad > item.celular.stock) {
      // this.alertService.mostrarAlerta(`No hay suficiente stock. Máximo disponible: ${item.celular.stock}`, 'warning');
      this.alertService.mostrarAlerta(
        `No puedes agregar más unidades. Máximo disponible: ${item.celular.stock}`,
        'warning'
      );
      cantidad = item.celular.stock;
    }

    item.cantidad = cantidad;
    this.ProductService.actualizarItem(item);
    this.calcularTotal();
  }

  // Método para proceder a comprar desde el carrito
  procederAPagar(): void {
    // Verificar stock antes de comprar
    const sinStock = this.items.filter(item => item.cantidad > item.celular.stock);

    if (sinStock.length > 0) {
      this.alertService.mostrarAlertaModal(
        'Stock insuficiente',
        'Algunos productos no tienen suficiente stock disponible',
        'error'
      );
      return;
    }

    const pedido = {
      clienteId: 1, // Obtener del servicio de autenticación
      items: this.items.map(item => ({
        celularId: item.celularId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario
      })),
      total: this.total,
      direccionEnvio: 'Dirección del cliente', // Obtener del formulario
      metodoPago: 'Tarjeta de crédito' // Obtener del formulario
    };

    this.ProductService.crearPedido(pedido).subscribe({
      next: (response) => {
        // Actualizar stock para cada item
        this.items.forEach(item => {
          this.ProductService.actualizarStockCelular(
            item.celularId,
            item.celular.stock - item.cantidad
          ).subscribe();
        });

        // Mostrar modal de éxito
        // this.mostrarModalExito = true;

        this.alertService.mostrarAlertaModal(
          'Compra exitosa',
          'Tu pedido ha sido procesado correctamente',
          'success'
        );

        // Vaciar carrito
        this.ProductService.vaciarCarrito();
      },
      error: (error) => {
        this.alertService.mostrarAlerta('Error al procesar el pedido', 'error');
        console.error(error);
      }
    });
  }


  async eliminarItem(item: any): Promise<void> {
    const confirmado = await this.alertService.mostrarConfirmacion(
      'Eliminar producto',
      '¿Estás seguro de eliminar este producto de tu carrito?'
    );
    if (confirmado) {
      this.ProductService.eliminarDelCarrito(item.celularId);
      this.calcularTotal();
    }

  }

}
