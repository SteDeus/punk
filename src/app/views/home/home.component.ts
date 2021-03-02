import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FromSpaceToUnderscorePipe } from 'src/app/pipes/from-space-to-underscore.pipe';
import { BeersListService } from 'src/app/services/beers-list.service';
import { FavouriteBeersService } from 'src/app/services/favourite-beers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'punk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filtersForm = new FormGroup({
    beer_name: new FormControl(''),
    abv_gt: new FormControl(''),
    abv_lt: new FormControl('')
  });

  environment = environment;

  constructor(
    public favouriteBeersService: FavouriteBeersService,
    public beersListService: BeersListService
  ) { }

  ngOnInit(): void {
    this.updateBeerList();
    for (const controller in this.filtersForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.filtersForm.controls, controller)) {
        this.filtersForm.get(controller)?.valueChanges.subscribe(
          res => {
            setTimeout( () => {
              this.updateBeerList();
            });
          }
        );
      }
    }
  }

  updateBeerList(): void {
    this.filtersForm.value.beer_name = new FromSpaceToUnderscorePipe().transform(this.filtersForm.value.beer_name);
    this.beersListService.updateBeerList(this.filtersForm.value);
  }

  changePage(newPage: number): void {
    this.beersListService.changePage(newPage, 10);
  }

}
