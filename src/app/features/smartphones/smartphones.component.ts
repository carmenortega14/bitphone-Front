import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../core/services/product.service";
import { ToastrService } from "../../core/services/toastr.service";
import { FilterByBrandPipe } from "../../shared/pipes/filterByBrand.pipe";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smartphones',
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './smartphones.component.html',
  styleUrl: './smartphones.component.scss'
})
export class SmartphonesComponent implements OnInit {

  celulares: any[] = [];
  celularesFiltrados: any[] = [];
  marcas: any[] = [];
  filtroMarcaId: number | null = null;

  constructor(
    private ProductService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCelulares();
    this.cargarMarcas();
  }

  brands: string[] = [];

  cargarCelulares(): void {
    this.ProductService.obtenerCelulares().subscribe({
      next: (data) => {
        this.celulares = data;
        this.celularesFiltrados = [...this.celulares];
      },
      error: (error) => console.error('Error al cargar celulares', error)
    });
  }

  cargarMarcas(): void {
    this.ProductService.obtenerMarcas().subscribe({
      next: (data) => this.marcas = data,
      error: (error) => console.error('Error al cargar marcas', error)
    });
  }

  filtrarPorMarca(event: any): void {
    const marcaId = event.target.value;
    this.filtroMarcaId = marcaId ? parseInt(marcaId) : null;
    
    if (!this.filtroMarcaId) {
      this.celularesFiltrados = [...this.celulares];
    } else {
      this.celularesFiltrados = this.celulares.filter(
        celular => celular.marcaId === this.filtroMarcaId
      );
    }
  }

  hoverImagen(event: any): void {
    const imagen = event.target;
    if (event.type === 'mouseenter') {
      imagen.style.transform = 'scale(1.05)';
    } else {
      imagen.style.transform = 'scale(1)';
    }
  }

  verDetalle(id: number): void {
    this.router.navigate(['/DetailSmartphone', id]);
  }
}
