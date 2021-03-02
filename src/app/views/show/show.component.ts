import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beer } from 'src/app/models/beer.model';
import { CheckIfInFavouritePipe } from 'src/app/pipes/check-if-in-favourite.pipe';
import { BeerDetailsService } from 'src/app/services/beer-details.service';
import { FavouriteBeersService } from 'src/app/services/favourite-beers.service';

@Component({
  selector: 'punk-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  beersToShow: {[key: string]: Beer} = {}; // active, prev, next
  
  constructor(
    private route: ActivatedRoute,
    public beerDetailsService: BeerDetailsService,
    public favouriteBeersService: FavouriteBeersService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      let beerId: number = parseInt( paramMap.get("beerId") as string );
      let ids: number[] = [beerId-1, beerId+1];
      if (beerId == this.beerDetailsService.randomBeerToShow.id) {
        this.beersToShow.active = this.beerDetailsService.randomBeerToShow;
      } else {
        ids.push(beerId);
      }
      this.beerDetailsService.getBeers(ids).subscribe(
        res => {
          for (let i = 0; i < res.length; i++) {
            switch (res[i].id) {
              case beerId+1:
                this.beersToShow.next = res[i];
                break;
              case beerId-1:
                this.beersToShow.prev = res[i];
                break;
              case beerId:
                this.beersToShow.active = res[i];
                break;
              default:
                break;
            }
          }
        }
      );
    });
  }

  changeFavouriteBeerState(selectedBeer: Beer | undefined): void {
    if (selectedBeer) {
      this.favouriteBeersService.changeFavouriteBeerState(selectedBeer);
    }
  }


  ngOnDestroy(): void {
    this.beerDetailsService.emptyBeersToShow();
  }

  nextBeer() {
    this.beersToShow.prev = this.beersToShow.active;
    this.beersToShow.active = this.beersToShow.next;
    this.beerDetailsService.getBeers([(this.beersToShow.active.id as number) + 1]).subscribe(
      res => {
        if (res[0]) {
          this.beersToShow.next = res[0];
        } else {
          delete this.beersToShow.next;
        }
      }
    )
  }

  prevBeer() {
    this.beersToShow.next = this.beersToShow.active;
    this.beersToShow.active = this.beersToShow.prev;
    this.beerDetailsService.getBeers([(this.beersToShow.active.id as number) - 1]).subscribe(
      res => {
        if (res[0]) {
          this.beersToShow.prev = res[0];
        } else {
          delete this.beersToShow.prev;
        }
      }
    )
  }

}
