import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-infousuario',
  imports: [],
  templateUrl: './infousuario.component.html',
  styleUrl: './infousuario.component.scss'
})
export class InfousuarioComponent implements OnInit {

  userProfile: KeycloakProfile | null = null;

  constructor(private keycloakService: KeycloakService) { }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }

  logout() {
    this.keycloakService.logout(window.location.origin);
  }
}
