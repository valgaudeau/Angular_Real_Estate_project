import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: IProperty[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
    {
      this.sellRent = 2; // we are on rent-property URL
    }
    // We call the subscribe method passing in an observer object. The observer object provides functions to react to the different types of notifications we can receive
    // from an observer. Those 3 notifications are next, error, and complete.
    // next allows us to specify what we want to do when the observable emits the next value. Since this is an HTTP request, it only emits one time.
    // error allows us to define what to do if the observable emits an error.
    this.housingService.getAllProperties().subscribe({
      next: properties => this.properties = properties,
      error: err => this.errorMessage = err
    })

    // this.housingService.getAllProperties().subscribe(
    //     data=>{
    //     this.properties = data;
    //     console.log(data)
    //   }, error => {
    //     console.log(error);
    //   }
    // )
  }

}
