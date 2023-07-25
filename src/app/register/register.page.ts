import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  validationMessages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Debe de tener un email valido" },
    ],
    pass: [
      { type: "required", message: "La Contraseña es obligatoria" },
      { type: "pattern", message: "Debe de tener por lo menos Mayúsculas, minúsculas y caracteres especiales" },
      { type: "min", message: "6" },
    ],
    userName: [
      { type: "required", message: "El nombre es obligatorio" },
      { type: "pattern", message: "Solo se admite texto" },
    ],
    lastName: [
      { type: "required", message: "El apellido es obligatorio" },
      { type: "pattern", message: "Solo se admite texto" },
    ],
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$")
            ]
          )
        ),
        password: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]{6,}$")
            ]
          )
        ),
        name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("[A-Za-z]"),
              Validators.minLength(1),
              Validators.maxLength(30)
            ]
          )
        ),
        last_name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("[A-Za-z]"),
              Validators.minLength(1),
              Validators.maxLength(30)
            ]
          )
        )
      }
    )
  }

  goToLogin() {
    // console.log("Ir atras");
    this.navCtrl.navigateBack("/login");
  }
  registerUser(userData: any) {
    console.log(userData);
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack("/login");
    })
  }
  ngOnInit() {
  }

}
