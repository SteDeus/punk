import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beer } from 'src/app/models/beer.model';
import { FavouriteBeersService } from 'src/app/services/favourite-beers.service';

@Component({
  selector: 'punk-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {

  @Input() beersToShow: Beer[] = [];
  @Output() favStateChanged: EventEmitter<Beer> = new EventEmitter<Beer>();

  constructor(
    public favouriteBeersService: FavouriteBeersService
  ) { }

  ngOnInit(): void {
  }

  changeFavouriteBeerState(selectedBeer: Beer): void {
    this.favouriteBeersService.changeFavouriteBeerState(selectedBeer);
    this.favStateChanged.emit(selectedBeer);
  }

}
