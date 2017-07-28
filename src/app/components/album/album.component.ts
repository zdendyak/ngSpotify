import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'album',
  templateUrl: 'album.component.html'
})

export class AlbumComponent {
    id: string;
    album: Album;
   
    constructor(private spotifyService: SpotifyService,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.spotifyService.getToken()
                    .subscribe(res => {
                        this.spotifyService.getAlbum(id, res.access_token)
                            .subscribe(album => {
                                this.album = album;
                            });

                    })
                
            });
    }

}