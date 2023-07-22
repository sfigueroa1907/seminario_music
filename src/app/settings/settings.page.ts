import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userImage = "assets/images/angular.png";
  photo: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(1).then(userData => {
      //TODO
    })
  }

  async takePhoto() {
    console.log("toque");
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = image.dataUrl;
    console.log("Cámara", image.dataUrl);
  }

}
