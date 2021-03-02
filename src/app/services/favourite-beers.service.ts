import { Injectable } from '@angular/core';
import { Beer } from '../models/beer.model';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBeersService {
  
  favouriteBeers: {[key: string]: Beer} = {};

  constructor() { }

  addToFavouriteBeers(beerToAdd: Beer): void {
    this.favouriteBeers[beerToAdd.id as number] = beerToAdd;
    beerToAdd.favourite = true;
  }

  changeFavouriteBeerState(selectedBeer: Beer): void {
    let selectedId: number = selectedBeer.id as number;
    if (this.isInFavourites(selectedId)) {
      this.removeFromFavouriteBeers(selectedId);
    } else {
      this.addToFavouriteBeers(selectedBeer);
    }
  }

  removeFromFavouriteBeers(beerIdToRemove: number): void {
    delete this.favouriteBeers[beerIdToRemove];
  }

  isInFavourites(beerIdToCheck: number): boolean {
    return this.favouriteBeers[beerIdToCheck] !== undefined;
  }

}
