import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationMessages = {
    email: [
      { type: "required", message: "El mensaje es obligatorio" },
      { type: "pattern", message: "Debe de tener un email valido" },
    ]
  }
  loginForm: FormGroup;

  errorMenssage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]{8,}$")
          ])
        )
      }
    );
  }

  ngOnInit() {
  }
  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMenssage = "";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/home");
    }).catch(err => {
      this.errorMenssage = err;
      console.log(this.errorMenssage);
    })
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }
}
