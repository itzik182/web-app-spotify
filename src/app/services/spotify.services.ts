import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { userData } from '../../data/user-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class SpotifyService {
  private clientId: string = userData.clientId;
  private clientSecret: string = userData.clientSecret;

  constructor(private _http: Http) { }

  // Get access token from Spotify to use API
  getAuth = (): Observable<any> => {

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(this.clientId + ':' + this.clientSecret)}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    const body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
      .map(res => res.json());

  }

  // Get search results for a query
  searchMusic(query: string, type = 'playlist', authToken: string): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    const searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=US';

    return this._http.get(searchUrl, { headers: headers })
      .map(res => res.json());
  }

  // Get categories
  getCategories(authToken: string): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    const categoriesUrl = 'https://api.spotify.com/v1/browse/categories?limit=20';

    return this._http.get(categoriesUrl, { headers: headers })
      .map(res => res.json());
  }

  // Get playlists in category selected
  getPlaylists(id: string, authToken: string): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    const playlistsUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=20`;

    return this._http.get(playlistsUrl, { headers: headers })
      .map(res => res.json());
  }

  // Get Tracks in playlists selected
  getTracks(id: string, authToken: string): Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    const tracksUrl = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=20`;

    return this._http.get(tracksUrl, { headers: headers })
      .map(res => res.json());
  }
}
