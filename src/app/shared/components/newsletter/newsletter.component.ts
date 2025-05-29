import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  newsletter = {
    email: '',
    isSubscribed: false
  };
  
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

}
