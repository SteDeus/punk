import { Pipe, PipeTransform } from '@angular/core';
import { Beer } from '../models/beer.model';

@Pipe({
  name: 'checkIfInFavourite',
  pure: false
})
export class CheckIfInFavouritePipe implements PipeTransform {

  transform(beer: Beer | undefined, favouriteBeers: {[key: string]: Beer}): boolean {
    if (beer) {
      return favouriteBeers[beer.id as number] !== undefined;
    }
    return false;
  }

}
