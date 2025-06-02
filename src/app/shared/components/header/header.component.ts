import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
import { ProductService } from '../../../../app/shared/services/product.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, KeycloakAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  cartItemCount = 3;
  marcas: string[] = [];

  private keycloakService = inject(KeycloakService);

  menuItems = [
    { name: 'Inicio', link: '/home', active: true },
    { name: 'Smartphones', link: '/smartphones', active: false },
    { name: 'Accesorios', link: '/accesorios', active: false },
    { name: 'Tablets', link: '/tablets', active: false },
    { name: 'Ofertas', link: '/ofertas', active: false }
  ];

  navigateTo(event: Event, link: string) {
    event.preventDefault();
    this.router.navigate([link]);
  }

  constructor(
    private router: Router,
    public ProductService: ProductService,
  ) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  brands: string[] = [];

  async cargarMarcas() {
    return new Promise<void>((resolve, reject) => {
      this.ProductService.obtenerMarcas().subscribe(
        data => {
          this.marcas = data;
          this.brands = data.map(marca => marca.nombre);
          resolve();
        },
        error => {
          console.error('Error al cargar las marcas:', error);
          reject(error);
        }
      );
    });
  }

  // async handleAccountClick() {
  //   // event.preventDefault();
  //   console.log('handleAccountClick called');
  //   const isLoggedIn = await this.keycloakService.isLoggedIn();

  //   if (isLoggedIn) {
  //     console.log('Usuario autenticado');
  //     this.router.navigate(['/infousuario']);
  //   } else {
  //     // Usuario no autenticado - redirigir a login de Keycloak
  //     console.log('Usuario no autenticado');
  //     this.keycloakService.login({
  //       redirectUri: window.location.origin + this.router.createUrlTree(['/infousuario'])
  //     });
  //   }
  // }

  // Component method - fixed version
  async handleAccountClick() {
    console.log('handleAccountClick called');

    try {
      // Verificar si el servicio está disponible
      if (!this.keycloakService) {
        console.error('KeycloakService no está disponible');
        // this.router.navigate(['/login']);
        return;
      }

      // Verificar estado de autenticación
      const isLoggedIn = this.keycloakService.isLoggedIn();

      if (isLoggedIn) {
        console.log('Usuario autenticado');
        await this.router.navigate(['/infousuario']);
      } else {
        console.log('Usuario no autenticado - iniciando login');

        // Usar el método login del servicio
        await this.keycloakService.login({
          redirectUri: `${window.location.origin}/infousuario`
        });
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      this.router.navigate(['/error']);
    }
  }

  // Alternative approach - more robust
  async handleAccountClickRobust() {
    console.log('handleAccountClick called');

    try {
      // Verificar si el usuario está autenticado
      const isAuthenticated = this.keycloakService.isLoggedIn();

      if (isAuthenticated) {
        console.log('Usuario autenticado, navegando a perfil');
        await this.router.navigate(['/infousuario']);
      } else {
        console.log('Usuario no autenticado, iniciando login');

        // Iniciar proceso de login
        const loginOptions = {
          redirectUri: `${window.location.origin}/infousuario`,
          prompt: "login" as "login" // Forzar prompt de login
        };

        await this.keycloakService.login(loginOptions);
      }
    } catch (error) {
      console.error('Error en handleAccountClick:', error);

      // Log más detallado del error
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }

      // Redirigir a página de error con información
      await this.router.navigate(['/error'], {
        queryParams: {
          reason: 'auth_error',
          message: 'Error en la autenticación'
        }
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  setActiveMenuItem(index: number, event: Event, link: string) {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
      event.preventDefault(); // Evita el comportamiento por defecto del href
      this.router.navigate([link]);
    });
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Searching for:', target.value);
    // Implementar lógica de búsqueda
  }

  navigateToNewsletter() {
    this.router.navigate(['/newsletter']);
  }
  
  navigateToAdmin() {
    this.router.navigate(['/adminpanel']);
  }
}
