
// export const environment = {
//     production: false,
//     keycloak: {
//         config: {
//         url: 'http://localhost:8081',
//         realm: 'bitphone',
//         clientId: 'bitphone-client'
//         },
//         initOptions: {
//         onLoad:  'check-sso', // Cambiar a 'login-required' para inicialización automática
//         checkLoginIframe: false
//         }
//     }
// };


export const environment = {
    production: false,
    ApiUrl: 'http://localhost:3000',
    keycloak: {
        config: {
            url: 'http://localhost:8081',
            realm: 'bitphone',
            clientId: 'bitphone-client'
        },
        initOptions: {
            onLoad: 'check-sso', // Cambiar de 'login-required' a 'check-sso'
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            checkLoginIframe: false,
            pkceMethod: 'S256' // Habilitar PKCE para mayor seguridad
        }
    }
};

// export const environment = {
//   production: false,
//   keycloak: {
//     config: {
//       url: 'http://localhost:8081',
//       realm: 'bitphone',
//       clientId: 'bitphone-client'
//     },
//     initOptions: {
//       // Cambiar de 'check-sso' a 'login-required' para inicialización automática
//       onLoad: 'login-required', // o mantener 'check-sso'
//       checkLoginIframe: false,
//       // Añadir estas opciones para mejor funcionamiento
//       silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
//       pkceMethod: 'S256'
//     }
//   }
// };