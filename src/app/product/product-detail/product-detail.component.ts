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
  public propertyId: number | undefined;
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
    this.propertyId = Number(this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (params) => {
        this.propertyId = Number(params['id']);
      }
    )
  }

  onSelectNext(){
    if(this.propertyId) // Had to add this if otherwise it says possibly undefined. Not very elegant, must be a better way of handling this.
    {
      this.propertyId += 1;
      this.router.navigate(['property-detail/' + this.propertyId]);
      // this.productService.getProductById(this.productId)
    }

  }

}
