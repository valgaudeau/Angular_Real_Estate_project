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
  spaceshipOrRobot = 1; // by default, we will will show spaceships. If value = 2, we show robots
  allProducts: IProduct[] = [];
  allSpaceships: IProduct[] = [];
  allRobots: IProduct[] = [];
  spaceshipsFromLocalStorage: IProduct[] = [];
  robotsFromLocalStorage: IProduct[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) // this gives us the current path of the route. We need this to identify is we are on the rent-property path to display the appropriate properties.
    {
      this.spaceshipOrRobot = 2; // we are on rent-property URL
    }
    // We call the subscribe method passing in an observer object. The observer object provides functions to react to the different types of notifications we can receive
    // from an observer. Those 3 notifications are next, error, and complete.
    // next allows us to specify what we want to do when the observable emits the next value. Since this is an HTTP request, it only emits one time.
    // error allows us to define what to do if the observable emits an error.
    const newProduct = JSON.parse(localStorage.getItem('newProduct') || '{}');
    console.log(newProduct);

    if(newProduct['SpaceshipOrRobot'] == 1){
      this.spaceshipsFromLocalStorage[0] = newProduct;
    } else {
      this.robotsFromLocalStorage[0] = newProduct;
    }

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

}
