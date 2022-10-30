import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public propertyId: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

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
    }

  }

}
