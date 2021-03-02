import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteComponent } from './views/favourite/favourite.component';
import { HomeComponent } from './views/home/home.component';
import { ShowComponent } from './views/show/show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'show/:beerId',
    component: ShowComponent
  },
  {
    path: 'favourite',
    component: FavouriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
