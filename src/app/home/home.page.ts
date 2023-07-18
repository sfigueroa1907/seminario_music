import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists: any;
  localArtists: any;

  constructor(private musicService: MusicService) { }
  ionViewDidEnter() {
    this.musicService.getArtists().then(listArtists => {
      this.artists = listArtists;
      if (this.artists != null) {
        console.log("no esta vacio", this.artists);

      }
      else {
        console.log("esta vacio", this.artists);

      }
    })

    this.localArtists = this.musicService.getArtistsFromJson();
    console.log("🤞🤞", this.localArtists.artists);

  }
}
