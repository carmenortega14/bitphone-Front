// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { AuthService } from './app/core/services/auth.service';

// async function initializeApp() {
//   try {
//     // Crear instancia del servicio
//     const authService = new AuthService();
    
//     // Inicializar Keycloak
//     await authService.init();
    
//     // Configurar el provider con la instancia inicializada
//     const configWithAuth = {
//       ...appConfig,
//       providers: [
//         ...appConfig.providers,
//         { provide: AuthService, useValue: authService }
//       ]
//     };
    
//     // Bootstrap de la aplicación
//     await bootstrapApplication(AppComponent, configWithAuth);
    
//   } catch (error) {
//     console.error('Error al inicializar la aplicación:', error);
//   }
// }

// initializeApp();
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

