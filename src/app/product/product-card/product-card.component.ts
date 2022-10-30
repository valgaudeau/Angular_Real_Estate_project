import { Component, Input } from '@angular/core';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-card',
  // template: ``,
  templateUrl: 'product-card.component.html',
  // styles:  ['h1{font-weight: normal;}']
  styleUrls: ['product-card.component.css']
}

)
export class ProductCardComponent{
  @Input() property: IProduct | undefined;
}
