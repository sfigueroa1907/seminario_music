import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (credentials.email == "sebastian@pca.edu.co" && credentials.password == "MyPassword123@") {
        accept("Login exitoso")
      } else {
        reject("Verifique sus credenciales")
      }
    })
  }
}
