import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  async canActivate() {
    const isUserLoggedIn = await this.storage.get("isUserLoggedIn");
    console.log("PisUserLoggedInasar", isUserLoggedIn);
    if (isUserLoggedIn) {
      return true;
    } else {
      console.log("No dejo pasar");
      this.navCtrl.navigateForward("/login");
      return false;
    }
  }

}
