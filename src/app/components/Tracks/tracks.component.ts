import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.services';
import { ActivatedRoute } from '@angular/router';
import { Tracks } from '../../models/Tracks';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './tracks.component.html',
  styleUrls: ['../../app.component.scss'],
  providers: [SpotifyService]
})
export class TracksComponent implements OnInit {
  tracks: Tracks[];

  constructor(private _spotifyService: SpotifyService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this._spotifyService.getAuth()
          .subscribe(res => this._spotifyService.getTracks(id, res.access_token).subscribe(
            res => {
              console.log(res.items)
              this.tracks = res.items.map(item => {
                return {
                  id: item.track.album.id,
                  name: item.track.album.name,
                  image: item.track.album.images.length > 0 ? item.track.album.images[0] : {url: ''},
                  external_urls: item.track.album.external_urls
                }
              })
            })
          );
      });
  }
}
