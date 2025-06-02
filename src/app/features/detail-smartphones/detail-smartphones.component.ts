import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "../../core/services/product.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail-smartphones',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-smartphones.component.html',
  styleUrl: './detail-smartphones.component.scss'
})
export class DetailSmartphonesComponent implements OnInit {

  celular: any = null;
  mostrarModal = false;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
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
    document.body.style.overflow = 'hidden'; // Deshabilita el scroll
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    document.body.style.overflow = ''; // Habilita el scroll nuevamente
  }


  comprarAhora(): void {
    // Lógica para compra directa
    console.log('Comprar ahora:', this.celular);

  }

  agregarAlCarrito(): void {
    // Lógica para agregar al carrito
    console.log('Agregar al carrito:', this.celular);
  }
}
