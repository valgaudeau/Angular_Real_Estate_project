import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list-search',
  templateUrl: './product-list-search.component.html',
  styleUrls: ['./product-list-search.component.css']
})
export class ProductListSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>(); // We create an event emitter, and we declare the type of event as string

  // This function will be called when the search text box input field is changed. At that point, whatever the user has entered in the search box will be assigned to the enteredSearchValue property.
  // This function needs to be called whenever the user types in the text box. For that, we need to bind the input event (which is triggered when user enters stuff in text box) with this function.
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }

}
