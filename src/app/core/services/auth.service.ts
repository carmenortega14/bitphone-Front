// // auth.service.ts - Versión ultra-simplificada
// import { Injectable } from '@angular/core';
// import Keycloak from 'keycloak-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private keycloak: Keycloak | undefined;

//   async init(): Promise<boolean> {
//     this.keycloak = new Keycloak({
//       url: 'http://localhost:8081/',
//       realm: 'bitphone',
//       clientId: 'bitphone-client',
//     });

//     try {
//       // Configuración mínima que evita problemas de iframe
//       const authenticated = await this.keycloak.init({
//         onLoad: 'check-sso', // Cambiado de 'login-required' a 'check-sso'
//         silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
//         checkLoginIframe: false,
//         checkLoginIframeInterval: 0,
//       });

//       if (!authenticated) {
//         // Si no está autenticado, hacer login manual
//         console.log('Usuario no autenticado, redirigiendo al login...');
//         this.keycloak.login();
//         return false;
//       }

//       console.log('Usuario autenticado correctamente');
//       return true;

//     } catch (error) {
//       console.error('Error en inicialización de Keycloak:', error);
//       // En caso de error, intentar login directo
//       this.keycloak.login();
//       return false;
//     }
//   }

//   logout(): void {
//     this.keycloak?.logout({
//       redirectUri: window.location.origin
//     });
//   }

//   getToken(): string | undefined {
//     return this.keycloak?.token;
//   }

//   isAuthenticated(): boolean {
//     return this.keycloak?.authenticated || false;
//   }
// }


import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) { }

  getUsername(): string {
    return this.keycloakService.getUsername();
  }

  isAdmin(): boolean {
    return this.keycloakService.getUserRoles().includes('Admin');
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isLoggedIn();
  }
}