import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "../../core/services/product.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from "../../core/services/alert.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-smartphones',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-smartphones.component.html',
  styleUrl: './detail-smartphones.component.scss'
})
export class DetailSmartphonesComponent implements OnInit {

  celular: any = null;
  mostrarModal = false;
  mostrarModalCarrito = false;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarCelular(parseInt(id));
    }
  }

  cargarCelular(id: number): void {
    this.ProductService.obtenerCelularPorId(id).subscribe({
      next: (data) => this.celular = data,
      error: (error) => console.error('Error al cargar celular', error)
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    // document.body.style.overflow = 'hidden'; // Deshabilita el scroll
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    // document.body.style.overflow = ''; // Habilita el scroll nuevamente
  }


  comprarAhora(): void {
    if (!this.celular || this.celular.stock <= 0) return;

    const pedido = {
      clienteId: 1,
      items: [{
        celularId: this.celular.id,
        cantidad: 1,
        precioUnitario: this.celular.precio
      }],
      total: this.celular.precio,
      direccionEnvio: 'Dirección del cliente',
      metodoPago: 'Tarjeta de crédito'
    };

    this.ProductService.crearPedido(pedido).subscribe({
      next: (response) => {
        console.log('Pedido creado:', response);
        this.actualizarStock(this.celular.id, this.celular.stock - 1);
        this.alertService.mostrarAlertaModal(
          'Compra exitosa',
          'Tu pedido ha sido procesado correctamente',
          'success'
        );
        // this.abrirModal();
      },
      error: (error) => {
        console.error('Error al crear pedido', error);
        // Mostrar mensaje de error al usuario
      }
    });
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  actualizarStock(celularId: number, nuevoStock: number): void {
    if (!celularId || nuevoStock < 0) {
      console.error('ID de celular inválido o stock negativo');
      return;
    }

    this.ProductService.actualizarStockCelular(celularId, nuevoStock).subscribe({
      next: (celularActualizado) => {
        if (this.celular && this.celular.id === celularId) {
          this.celular.stock = nuevoStock;
        }
      },
      error: (error) => {
        console.error('Error al actualizar stock', error);
      }
    });
  }

  agregarAlCarrito(): void {
    if (!this.celular) return;

    // Verificar stock disponible
    if (this.celular.stock <= 0) {
      this.alertService.mostrarAlerta('No hay stock disponible para este producto', 'error');
      return;
    }

    // Obtener cantidad en carrito
    const cantidadEnCarrito = this.ProductService.getCantidadEnCarrito(this.celular.id);

    // Verificar que no exceda el stock
    if (cantidadEnCarrito >= this.celular.stock) {
      this.alertService.mostrarAlerta('No puedes agregar más unidades, stock limitado', 'warning');
      return;
    }

    this.ProductService.agregarAlCarrito({
      celularId: this.celular.id,
      cantidad: 1,
      precioUnitario: this.celular.precio,
      celular: this.celular
    });

    this.mostrarModalCarrito = true;
    // document.body.style.overflow = 'hidden';
  }

  cerrarModalCarrito(): void {
    this.mostrarModalCarrito = false;
    // document.body.style.overflow = '';
  }
}
