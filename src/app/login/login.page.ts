import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
// import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationMessages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Debe de tener un email valido" },
    ],
    pass: [
      { type: "required", message: "La Contraseña es obligatoria" },
      { type: "pattern", message: "Debe de tener por lo menos Mayúsculas, minúsculas y caracteres especiales" },
      { type: "min", message: "6" },
    ]
  }
  loginForm: FormGroup;

  errorMenssage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
    private popoverController: PopoverController,
    // private toastController: ToastController,
    private alertCtrl: AlertController,
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
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]{6,}$")
          ])
        )
      }
    );
    // console.log("🙌🙌", this.loginForm.valid);
  }

  ngOnInit() {

  }
  
  loginUser(credentials: any) {
    // console.log(credentials);
    this.authService.loginUser(credentials).then((res: any) => {
      this.errorMenssage = "";
      this.storage.set("isUserLoggedIn", true);
      this.storage.set("user_id", res.id);
      this.navCtrl.navigateForward("/menu/home");
      this.presentAlert("¡Bien!", "Inicio de sección", "Exitoso");
    }).catch(err => {
      this.errorMenssage = err;
      console.log(this.errorMenssage);
      this.presentAlert("Opps", "Error de Login", "Revisa tus credenciales");
    })
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }


}
