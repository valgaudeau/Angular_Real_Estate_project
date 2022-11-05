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
    Id: -1,
    Name: 'default name',
    SpaceshipOrRobot: -1,
    Price: -1,
    Age: -1,
    Description: 'default description'
  }

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params) => {
        this.productId = Number(params['id']);
        this.productService.getProductById(this.productId).subscribe(
          data => {
            this.productToDisplay.Name = data?.Name!;
            this.productToDisplay.SpaceshipOrRobot = data?.SpaceshipOrRobot!;
            this.productToDisplay.Image = data?.Image!;
            this.productToDisplay.Price = data?.Price!;
            this.productToDisplay.Age = data?.Age!;
            this.productToDisplay.Description = data?.Description!;
            console.log(this.productToDisplay);
          }
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
