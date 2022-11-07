import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  spaceshipOrRobot = 0; // by default, we show ALL of the products. If value = 1, we show spaceships. If value = 2, we show robots
  allProducts: IProduct[] = [];
  allSpaceships: IProduct[] = [];
  allRobots: IProduct[] = [];
  errorMessage: string = '';
  searchText: string = ''; // when the searchTextChanged event is raised, we set the value of this property

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString() == 'spaceships') // this gives us the current path of the route. We need this to identify is we are on the robot path to display the appropriate properties.
    {
      // console.log("yes this is the route.snapshot.url value for spaceship page " + this.route.snapshot.url.toString());
      this.spaceshipOrRobot = 1; // we are on rent-property URL
    }

    if(this.route.snapshot.url.toString() == 'robots') // this gives us the current path of the route. We need this to identify is we are on the robot path to display the appropriate properties.
    {
      // console.log("yes this is the route.snapshot.url value for robot page " + this.route.snapshot.url.toString());
      this.spaceshipOrRobot = 2; // we are on rent-property URL
    }
    // We call the subscribe method passing in an observer object. The observer object provides functions to react to the different types of notifications we can receive from an observer. Those 3 notifications are next, error, and complete.
    // next allows us to specify what we want to do when the observable emits the next value. Since this is an HTTP request, it only emits one time.
    // error allows us to define what to do if the observable emits an error.
    this.productService.getAllProducts().subscribe({
      next: products => this.allProducts = products,
      error: err => this.errorMessage = err
    })

    this.productService.getAllProducts().subscribe({
      next: products => this.allSpaceships = products.filter(products => products.SpaceshipOrRobot == 1),
      error: err => this.errorMessage = err,
    })

    this.productService.getAllProducts().subscribe({
      next: products => this.allRobots = products.filter(products => products.SpaceshipOrRobot == 2),
      error: err => this.errorMessage = err
    })

  }

  // This function will be called when the custom event is raised. The event will emit some data, and we want to receive it here and set the property searchText.
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue.toLowerCase();
    console.log(this.searchText);
  }

}
