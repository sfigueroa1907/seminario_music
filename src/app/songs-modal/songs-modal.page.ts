import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {
  songs: any;
  artist_name: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    this.artist_name = this.navParams.data['artist']
    // console.log("Las canciones: ", this.songs);
    // console.log("Artist: ", this.artist_name);
  }
  close() {
    return this.modalController.dismiss();
  }

  async selectSong(song: any) {
    await this.modalController.dismiss(song);
  }

}
