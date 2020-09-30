import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.services';

import { Playlists } from '../../models/Playlists';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './playlists.component.html',
  styleUrls: ['../../app.component.scss'],
  providers: [SpotifyService]
})
export class PlaylistComponent implements OnInit {
  playlists: Playlists[];

  constructor(private _spotifyService: SpotifyService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this._spotifyService.getAuth()
          .subscribe(res => this._spotifyService.getPlaylists(id, res.access_token).subscribe(
            res => {
              console.log(res.playlists.items)
              this.playlists = res.playlists.items
            })
          );
      });
  }
}
