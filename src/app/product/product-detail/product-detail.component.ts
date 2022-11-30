import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number | undefined;
  // Same thing as in addProductComponent, don't like how this is done, refactor later if I find a better solution
  productToDisplay: IProduct = {
    id: -1,
    name: 'default name',
    spaceshipOrRobot: -1,
    price: -1,
    age: -1,
    description: 'default description'
  }

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    // this.productId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.productId = Number(params['id']);
        this.productService.getProductById(this.productId).subscribe(
          data => {
            this.productToDisplay.name = data?.name!;
            this.productToDisplay.spaceshipOrRobot = data?.spaceshipOrRobot!;
            this.productToDisplay.image = data?.image!;
            this.productToDisplay.price = data?.price!;
            this.productToDisplay.age = data?.age!;
            this.productToDisplay.description = data?.description!;
            // console.log(this.productToDisplay);
          }, error => this.router.navigate(['/']) // If the data from the API throws an error, stay on home page. Need to use Route Resolver for this, but haven't managed to make it work yet
        )
      }
    )
  }

  onSelectNext(){
    if(this.productId) // Had to add this if otherwise it says possibly undefined. Not very elegant, must be a better way of handling this.
    {
      this.productId += 1;
      this.router.navigate(['product-detail/' + this.productId]);
    }

  }

}
