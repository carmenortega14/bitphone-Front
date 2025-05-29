
export const environment = {
    production: false,
    keycloak: {
        config: {
        url: 'http://localhost:8081',
        realm: 'bitphone',
        clientId: 'bitphone-client'
        },
        initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
        }
    }
};