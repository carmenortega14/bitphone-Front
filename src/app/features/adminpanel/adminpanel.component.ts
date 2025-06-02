import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adminpanel',
  imports: [CommonModule, FormsModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent implements OnInit {

  currentTab: 'celular' | 'actualizar-celular' | 'marca' | 'categoria' = 'celular';

  // Modelos para los formularios
  nuevoCelular: any = {
    categoriaIds: []
  };
  nuevaMarca: any = {};
  nuevaCategoria: any = {};

  // Listas para selects
  marcas: any[] = [];
  categorias: any[] = [];

  // Mensajes
  mensaje: string = '';
  esError: boolean = false;

  // Archivo seleccionado para el celular
  selectedFile: File | null = null;

  // Para el formulario de actualización
  celulares: any[] = [];
  celularSeleccionadoId: number | null = null;
  celularParaEditar: any = null;
  selectedFileEditar: File | null = null;
  
  // Constructor
  constructor(private productService: ProductService) { }

  // NgOnInit lifecycle hook
  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarCategorias();
    this.cargarCelularesParaEditar();
  }

  // Carga las marcas al iniciar el componente
  cargarMarcas(): void {
    this.productService.obtenerMarcas().subscribe(
      data => this.marcas = data,
      error => this.mostrarMensaje('Error al cargar marcas', true)
    );
  }

  // Carga las categorías al iniciar el componente
  cargarCategorias(): void {
    this.productService.obtenerCategorias().subscribe(
      data => this.categorias = data,
      error => this.mostrarMensaje('Error al cargar categorías', true)
    );
  }

  // File input change handler
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Guardar celular
  onSubmitCelular(): void {
    const celularData = {
      modelo: this.nuevoCelular.modelo,
      descripcion: this.nuevoCelular.descripcion,
      precio: this.nuevoCelular.precio,
      stock: this.nuevoCelular.stock,
      color: this.nuevoCelular.color,
      almacenamiento: this.nuevoCelular.almacenamiento,
      ram: this.nuevoCelular.ram,
      pantalla: this.nuevoCelular.pantalla,
      sistemaOperativo: this.nuevoCelular.sistemaOperativo,
      marcaId: this.nuevoCelular.marcaId
    };

    if (this.selectedFile) {
      this.productService.crearCelularConImagen(celularData, this.selectedFile).subscribe({
        next: (response) => {
          // Manejo de respuesta exitosa
          this.mostrarMensaje('Celular creado exitosamente');
          this.resetForm();
        },
        error: (error) => {
          this.mostrarMensaje('Error al crear celular: ' + error.message, true);
        }
      });
    } else {
      this.mostrarMensaje('Debe seleccionar una imagen para el celular.', true);
    }
  }

  // resetear formulario
  resetForm(): void {
    this.nuevoCelular = {};
    this.selectedFile = null;
  }

  // guardar marca
  onSubmitMarca(): void {
    this.productService.crearMarca(this.nuevaMarca).subscribe(
      response => {
        this.mostrarMensaje('Marca creada exitosamente');
        this.nuevaMarca = {}; // Resetear formulario
        this.cargarMarcas(); // Actualizar lista de marcas
      },
      error => this.mostrarMensaje('Error al crear marca: ' + error.message, true)
    );
  }

  // guardar categoría
  onSubmitCategoria(): void {
    this.productService.crearCategoria(this.nuevaCategoria).subscribe(
      response => {
        this.mostrarMensaje('Categoría creada exitosamente');
        this.nuevaCategoria = {}; // Resetear formulario
        this.cargarCategorias(); // Actualizar lista de categorías
      },
      error => this.mostrarMensaje('Error al crear categoría: ' + error.message, true)
    );
  }

  cargarCelularesParaEditar(): void {
    this.productService.obtenerCelulares().subscribe({
      next: (data) => this.celulares = data,
      error: (error) => this.mostrarMensaje('Error al cargar celulares', true)
    });
  }

  cargarCelularParaEditar(): void {
    if (!this.celularSeleccionadoId) return;
    
    this.productService.obtenerCelularPorId(this.celularSeleccionadoId).subscribe({
      next: (celular) => {
        this.celularParaEditar = {
          ...celular,
          categoriaIds: celular.categorias?.map((c: any) => c.id) || []
        };
        this.selectedFileEditar = null;
      },
      error: (error) => this.mostrarMensaje('Error al cargar celular', true)
    });
  }

  onFileSelectedEditar(event: any): void {
    this.selectedFileEditar = event.target.files[0];
    
    // Mostrar vista previa de la nueva imagen
    if (this.selectedFileEditar) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.celularParaEditar.imagenUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFileEditar);
    }
  }

  onActualizarCelular(): void {
    if (!this.celularSeleccionadoId || !this.celularParaEditar) return;

    const celularData = {
      modelo: this.celularParaEditar.modelo,
      descripcion: this.celularParaEditar.descripcion,
      precio: parseFloat(this.celularParaEditar.precio),
      stock: parseInt(this.celularParaEditar.stock),
      color: this.celularParaEditar.color,
      almacenamiento: parseInt(this.celularParaEditar.almacenamiento),
      ram: parseInt(this.celularParaEditar.ram),
      pantalla: parseFloat(this.celularParaEditar.pantalla),
      sistemaOperativo: this.celularParaEditar.sistemaOperativo,
      marcaId: parseInt(this.celularParaEditar.marcaId),
      categoriaIds: this.celularParaEditar.categoriaIds.map((id: string) => parseInt(id))
    };

    if (this.selectedFileEditar) {
      // Actualizar con nueva imagen
      this.productService.actualizarCelularConImagen(
        this.celularSeleccionadoId, 
        celularData, 
        this.selectedFileEditar
      ).subscribe({
        next: () => {
          this.mostrarMensaje('Celular actualizado exitosamente');
          this.resetFormularioEdicion();
          this.cargarCelularesParaEditar();
        },
        error: (error) => this.mostrarMensaje('Error al actualizar celular: ' + error.message, true)
      });
    } else {
      // Actualizar sin cambiar la imagen
      this.productService.actualizarCelular(
        this.celularSeleccionadoId, 
        celularData
      ).subscribe({
        next: () => {
          this.mostrarMensaje('Celular actualizado exitosamente');
          this.resetFormularioEdicion();
          this.cargarCelularesParaEditar();
        },
        error: (error) => this.mostrarMensaje('Error al actualizar celular: ' + error.message, true)
      });
    }
  }

  resetFormularioEdicion(): void {
    this.celularSeleccionadoId = null;
    this.celularParaEditar = null;
    this.selectedFileEditar = null;
  }

  // Mostrar mensaje de éxito o error
  mostrarMensaje(texto: string, esError: boolean = false): void {
    this.mensaje = texto;
    this.esError = esError;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }
}
