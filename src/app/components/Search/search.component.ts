import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.services';
import { FormControl } from '@angular/forms';

import { Playlists } from '../../models/Playlists';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SpotifyService]
})
export class SearchComponent implements OnInit {
  searchStr: string;
  results: Playlists[];
  query: FormControl = new FormControl();

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    this.query.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe(res => this._spotifyService.searchMusic(query, 'playlist', res.access_token)
          .subscribe(
          res => {
            console.log(res.playlists.items)
            this.results = res.playlists.items
          })
        ));
  }
}
