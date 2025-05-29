import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  cartItemCount = 3; // Ejemplo de items en carrito

  menuItems = [
    { name: 'Inicio', link: '/home', active: true },
    { name: 'Smartphones', link: '/smartphones', active: false },
    { name: 'Accesorios', link: '/accesorios', active: false },
    { name: 'Tablets', link: '/tablets', active: false },
    { name: 'Ofertas', link: '/ofertas', active: false }
  ];

  navigateTo(event: Event, link: string) {
    event.preventDefault(); // Evita el comportamiento por defecto del href
    this.router.navigate([link]);
  }

  brands = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google'];

  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
