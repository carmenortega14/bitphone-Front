import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  
  currentYear = new Date().getFullYear();
  
  quickLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Productos', url: '/productos' },
    { name: 'Ofertas', url: '/ofertas' },
    { name: 'Sobre Nosotros', url: '/nosotros' },
    { name: 'Contacto', url: '/newsletter' }
  ];

  categories = [
    { name: 'Smartphones', url: '/smartphones' },
    { name: 'iPhone', url: '/iphone' },
    { name: 'Samsung Galaxy', url: '/samsung' },
    { name: 'Xiaomi', url: '/xiaomi' },
    { name: 'Accesorios', url: '/accesorios' },
    { name: 'Fundas', url: '/fundas' },
    { name: 'Cargadores', url: '/cargadores' },
    { name: 'Auriculares', url: '/auriculares' }
  ];

  customerService = [
    { name: 'Centro de Ayuda', url: '/ayuda' },
    { name: 'Política de Envíos', url: '/envios' },
    { name: 'Devoluciones', url: '/devoluciones' },
    { name: 'Garantías', url: '/garantias' },
    { name: 'Términos y Condiciones', url: '/terminos' },
    { name: 'Política de Privacidad', url: '/privacidad' }
  ];

  socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com', 
      icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.33V2.26S17.33 2 15.62 2c-3.33 0-5.12 2.24-5.12 5.77v1.69h-2.5v2.6h2.5v6.61h3.27V11.06h2.56l.46-2.6z' 
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com', 
      icon: 'M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm0 1.5a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zM17.5 4.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z' 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com', 
      icon: 'M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z' 
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com', 
      icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' 
    },
    { 
      name: 'WhatsApp', 
      url: 'https://wa.me/1234567890', 
      icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488' 
    }
  ];

  paymentMethods = [
    { name: 'Visa', logo: 'visa' },
    { name: 'Mastercard', logo: 'mastercard' },
    { name: 'American Express', logo: 'amex' },
    { name: 'PayPal', logo: 'paypal' },
    { name: 'Mercado Pago', logo: 'mercadopago' }
  ];

  newsletter = {
    email: '',
    isSubscribed: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  subscribeNewsletter() {
    if (this.newsletter.email) {
      console.log('Subscribing email:', this.newsletter.email);
      this.newsletter.isSubscribed = true;
      // Implementar lógica de suscripción
      setTimeout(() => {
        this.newsletter.isSubscribed = false;
        this.newsletter.email = '';
      }, 3000);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
