import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  userImage = "assets/images/angular.png";
  photo: any;
  userInfo: any;
  constructor(
    private userService: UserService,
    private storage: Storage,
    private alertCtrl: AlertController,) { }

  ionViewDidEnter() {
    this.userService.getUser().then(userData => {
      this.userInfo = userData;
      this.photo = userData.image;
    });
  }



  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      })
      this.photo = image.dataUrl;
      console.log(image.dataUrl)
      this.userService.updateUser({ "image": this.photo }).then((res: any) => {
        console.log(res)
      })
    }
    catch (error) {
      console.log("No se selecciono foto")
      this.presentAlert("Alerta", "Perfil", "No se ha seleccionado foto");
    }

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

}
