import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keycloak: KeycloakService) {}
   
  getRoles(){
    return this.keycloak.getUserRoles();
  }

  isAdmin(){
    let roles = this.keycloak.getUserRoles().filter(role => role == "Administrador");

    if(roles.length > 0){
      return true;
    }else{
      return false;
    }
  }
}
