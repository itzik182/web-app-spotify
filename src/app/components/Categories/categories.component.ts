import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.services';

import { Category } from '../../models/Category';

@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './categories.component.html',
  styleUrls: ['../../app.component.scss'],
  providers: [SpotifyService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    this._spotifyService.getAuth()
      .subscribe(res => this._spotifyService.getCategories(res.access_token).subscribe(
        res => {
          console.log(res.categories.items)
          this.categories = res.categories.items
        })
      );
  }
}
