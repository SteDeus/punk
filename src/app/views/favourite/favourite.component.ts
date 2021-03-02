import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/models/beer.model';
import { FavouriteBeersService } from 'src/app/services/favourite-beers.service';

@Component({
  selector: 'punk-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  favouriteList: Beer[] = [];

  constructor(
    public favouriteBeersService: FavouriteBeersService
  ) { }

  ngOnInit(): void {
    for (const beer in this.favouriteBeersService.favouriteBeers) {
      if (Object.prototype.hasOwnProperty.call(this.favouriteBeersService.favouriteBeers, beer)) {
        this.favouriteList.push( this.favouriteBeersService.favouriteBeers[beer] );
      }
    }
  }

  updateFavouriteList(beerToRemove: Beer) {
    this.favouriteList.splice(
      this.favouriteList.findIndex(beer => beer.id === beerToRemove.id), 1
    )
  }

}
