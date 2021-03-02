import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerDetailsService } from 'src/app/services/beer-details.service';

@Component({
  selector: 'punk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  router: Router;
  route: ActivatedRoute;
  beerDetailsService: BeerDetailsService;

  isMenuCollapsed: boolean = true;

  constructor(
    router: Router,
    route : ActivatedRoute,
    beerDetailsService: BeerDetailsService
  ) {
    this.router = router;
    this.route = route;
    this.beerDetailsService = beerDetailsService;
  }

  ngOnInit(): void {
  }

  toRandomBeer() {
    this.beerDetailsService.getRandomBeer().subscribe(
      res => {
        this.router.navigate(["../show/" + this.beerDetailsService.randomBeerToShow.id], { relativeTo: this.route })
      }
    )
  }

}
