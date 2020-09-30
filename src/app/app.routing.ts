import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './components/Search/search.component';
import { CategoriesComponent } from './components/Categories/categories.component';
import { PlaylistComponent } from './components/Playlists/playlists.component';
import { TracksComponent } from './components/Tracks/tracks.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
      path:
      'home',
      component: SearchComponent
    },
    {
      path: 'categories',
      component: CategoriesComponent
    },
    {
      path: 'playlists/:id',
      component: PlaylistComponent,
    },
    {
      path: 'tracks/:id',
      component: TracksComponent,
    }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
