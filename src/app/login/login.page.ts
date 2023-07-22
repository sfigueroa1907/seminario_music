import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController, PopoverController  } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
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
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.errorMenssage,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  loginUser(credentials: any) {
    // console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMenssage = "";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err => {
      this.errorMenssage = err;
      console.log(this.errorMenssage);
      
    })
  }
   

  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }

  
}
