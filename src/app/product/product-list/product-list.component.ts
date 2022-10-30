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
  sellOrRentRoute = 1; // by default, we will will show the properties available for purchase. If value = 2, then we have to display properties up for rent
  allProperties: IProduct[] = [];
  buyProperties: IProduct[] = [];
  rentProperties: IProduct[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) // this gives us the current path of the route. We need this to identify is we are on the rent-property path to display the appropriate properties.
    {
      this.sellOrRentRoute = 2; // we are on rent-property URL
    }
    // We call the subscribe method passing in an observer object. The observer object provides functions to react to the different types of notifications we can receive
    // from an observer. Those 3 notifications are next, error, and complete.
    // next allows us to specify what we want to do when the observable emits the next value. Since this is an HTTP request, it only emits one time.
    // error allows us to define what to do if the observable emits an error.
    this.productService.getAllProperties().subscribe({
      next: properties => this.allProperties = properties,
      error: err => this.errorMessage = err
    })

    this.productService.getAllProperties().subscribe({
      next: properties => this.buyProperties = properties.filter(property => property.SellRent == 1),
      error: err => this.errorMessage = err
    })

    this.productService.getAllProperties().subscribe({
      next: properties => this.rentProperties = properties.filter(property => property.SellRent == 2),
      error: err => this.errorMessage = err
    })

    // console.log("HI FROM ngOnInit in property list component");

    // DONT KNOW WHY BUT THIS DOESNT WORK - DOESNT SHOW UP IN THE CONSOLE, AND HAVING THE SEPARATEPROPERTIES FUNCTION DOESN'T DO THE JOB
    // for(let property of this.allProperties){
    //   console.log(property.Name + " hey this is property in ngOnInit");
    // }

    // this.separatePropertiesByType();
  }

  // Need a method here which we can call in ngOnInit() that will fill the buyProperties and rentProperties arrays
  // separatePropertiesByType(){
  //   for(let property of this.allProperties){
  //     if(property.SellRent == 1)
  //     {
  //       this.buyProperties.push(property);
  //       console.log(property + " added to buyProperty array");
  //     }
  //     else
  //     {
  //       this.rentProperties.push(property);
  //       console.log(property + " added to rentProperty array");
  //     }
  //   }
  // }

}