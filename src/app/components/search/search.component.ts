import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html'
})
export class SearchComponent  {
  searchStr:string;
  searchRes: Artist[];

  constructor(private spotifyService: SpotifyService) {

  }

  searchMusic() {
    this.spotifyService.getToken()
    .subscribe(res => {
      this.spotifyService.searchMusic(this.searchStr, 'artist', res.access_token)
      .subscribe(res => {
        this.searchRes = res.artists.items;
      });
    })
    
  }
}