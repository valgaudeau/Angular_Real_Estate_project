import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<any> = [
    {
      "Id":1,
      "Name":"Birla House",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":2,
      "Name":"Erose Villa",
      "Type":"House",
      "Price":11400
    },
    {
      "Id":3,
      "Name":"placeholder 3",
      "Type":"House",
      "Price":15000
    },
    {
      "Id":4,
      "Name":"placeholder 4",
      "Type":"House",
      "Price":16000
    },
    {
      "Id":5,
      "Name":"placeholder 5",
      "Type":"House",
      "Price":12000
    },
    {
      "Id":6,
      "Name":"placeholder 6",
      "Type":"House",
      "Price":12000
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
