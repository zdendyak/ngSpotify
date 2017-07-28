import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    private searchUrl: string; 
    private redirectUri:string;
    private clientId = '251b916861d746c68360438c97d8e18a';
    private clientSecret = '620f4cc41499456fb9f5147c30c4e64b';
    private accessToken: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;
    private encoded = btoa(this.clientId + ':' + this.clientSecret);

    constructor(private http: Http) {

    }

    getToken() {
       let params = ('grant_type=client_credentials');
       let headers = new Headers();
       headers.append('Authorization', 'Basic ' + this.encoded);
       headers.append('Content-Type', 'application/x-www-form-urlencoded' );
       return this.http.post('https://accounts.spotify.com/api/token', params, {headers: headers})
                .map(res => res.json()); 
    }

    searchMusic(str: string, type='artist', token: string){        
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limits=20&type=' + type;
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.searchUrl, {headers: headers})
            .map(res => res.json());
    }

    getArtist(id: string, token: string){        
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.artistUrl, {headers: headers})
            .map(res => res.json());
    }

    getAlbums(artistId: string, token: string) {
        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.albumsUrl, {headers: headers})
            .map(res => res.json());
    }

    getAlbum(albumId: string, token: string) {
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + albumId;
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.albumUrl, {headers: headers})
            .map(res => res.json());
    }
}