import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideKeycloak } from 'keycloak-angular';

import { environment } from '../app/environments/environment';

import { KeycloakOnLoad } from 'keycloak-js';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: environment.keycloak.config.url,
        realm: environment.keycloak.config.realm,
        clientId: environment.keycloak.config.clientId
      },
      initOptions: {
        onLoad: environment.keycloak.initOptions.onLoad as KeycloakOnLoad,
        checkLoginIframe: environment.keycloak.initOptions.checkLoginIframe,
        silentCheckSsoRedirectUri: environment.keycloak.initOptions.silentCheckSsoRedirectUri,
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
