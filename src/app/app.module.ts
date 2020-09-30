import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';

import { SpotifyService } from './services/spotify.services';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Navigation/navbar.component';
import { SearchComponent } from './components/Search/search.component';
import { CategoriesComponent } from './components/Categories/categories.component';
import { PlaylistComponent } from './components/Playlists/playlists.component';
import { TracksComponent } from './components/Tracks/tracks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    CategoriesComponent,
    PlaylistComponent,
    TracksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
