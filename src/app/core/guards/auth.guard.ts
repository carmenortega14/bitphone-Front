import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

// const isAccessAllowed = async (
//   route: ActivatedRouteSnapshot,
//   __: RouterStateSnapshot,
//   authData: AuthGuardData
// ): Promise<boolean | UrlTree> => {
//   const { authenticated, grantedRoles } = authData;
//   console.log('Roles concedidos:', grantedRoles);

//   const requiredRoles = route.data['roles'];
//   if (!requiredRoles || requiredRoles.length === 0) {
//     return true; // Si no hay roles requeridos, permitir acceso
//   }

//   // Obtener los roles del cliente específico (bitphone-client)
//   const clientRoles = grantedRoles.resourceRoles['bitphone-client'] || [];
//   console.log(clientRoles)
  
//   // Verificar si el usuario tiene al menos uno de los roles requeridos
//   const hasRequiredRole = requiredRoles.some((role:any) => 
//     clientRoles.includes(role)
//   );

//   if (authenticated && hasRequiredRole) {
//       return true;
//   }
  
//   const router = inject(Router);
//   return router.parseUrl('/unauthorised');
// };

// export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);



const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;
  console.log('Roles concedidos:', grantedRoles);

  const requiredRoles = route.data['roles'];
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // Si no hay roles requeridos, permitir acceso
  }

  // Obtener los roles del "realm"
  const realmRoles = grantedRoles.realmRoles || [];
  console.log('Roles del realm:', realmRoles);

  // Verificar si el usuario tiene al menos uno de los roles requeridos
  const hasRequiredRole = requiredRoles.some((role: any) =>
    realmRoles.includes(role)
  );

  if (authenticated && hasRequiredRole) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/unauthorised');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);

/**
 * The logic below is a simple example, please make it more robust when implementing in your application.
 *
 * Reason: isAccessGranted is not validating the resource, since it is merging all roles. Two resources might
 * have the same role name and it makes sense to validate it more granular.
//  */
// const isAccessAllowed = async (
//   route: ActivatedRouteSnapshot,
//   __: RouterStateSnapshot,
//   authData: AuthGuardData
// ): Promise<boolean | UrlTree> => {
//   const { authenticated, grantedRoles } = authData;
//       console.log('Roles concedidos:', grantedRoles);
//   console.log('Estructura completa de authData:', authData);

//   const requiredRole = route.data['role'];
//   if (!requiredRole) {
//     return false;
//   }

//   const hasRequiredRole = (role: string): boolean =>
//     Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

//   if (authenticated && hasRequiredRole(requiredRole)) {
//     return true;
//   }

//   const router = inject(Router);
//   return router.parseUrl('/unauthorised');
// };

// export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
