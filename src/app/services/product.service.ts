import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../product/IProduct.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root' // Service is registered in the root, meaning it can be accessed from any component or service in the application. Alternative = component injector.
})
export class ProductService {

private propertyUrl = './assets/products.json';

constructor(private http:HttpClient) { }

// Notes on the functions used below:
// The tap operator allows to access the item emitted by the Observable without modifying it. This operator takes in an arrow function. The parameter 'data' is the emitted data,
// and the arrow function is what we want to do with it. So right now we have (data => console.log('All', JSON.stringify(data))) to log all of the emitted data to the console.
// Next, we have the catchError function. Often the emitted data will have errors, and we want our pipe to catch these issues.
getAllProducts() : Observable<IProduct[]>
{
  return this.http.get<IProduct[]>(this.propertyUrl).pipe(
    tap(data => console.log('All', JSON.stringify(data))),
    catchError(this.handleError)
  );
}

/*
getAllProperties(){
  return this.http.get('./assets/properties.json')
}
*/

private handleError(err: HttpErrorResponse){
  let errorMessage = '';
  if(err.error instanceof ErrorEvent)
  {
    // If a client-side or network error occurred, we can handle it here
    errorMessage = `An error occurred: ${err.error.message}`;
  }
  else
  {
    // If we reach this section, the backend returned an unsuccessful response code.
    // The response body returned by the server should contain clues as to what went wrong.
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(() => errorMessage);
}

// Add new product to array of existing products if that array exists, or initialize it if it doesn't exist yet
addProduct(product: IProduct){
  let productList: Array<IProduct> = [];
  if(localStorage.getItem('productId')) {
    productList = JSON.parse(localStorage.getItem('productId') || '{}');
    productList = [product, ...productList];
  } else {
    productList = [product]
  }
  localStorage.setItem('productId', JSON.stringify(productList));
  // localStorage.setItem('newProduct', JSON.stringify(product));
}

// This will be called when a new product is mapped to the values inputted in the addProduct form, and we need to set a new id for the product being saved to local storage
// Logic: Retrieve array of products in local storage. If length == 0, then we can return -1 as the default id for the first product being added. If != 0, return the length of array + 1.
newProductId():number {
  let productsFromLocalStorage: Array<IProduct> =[];
  productsFromLocalStorage = JSON.parse(localStorage.getItem('productId') || '{}');
  var numberOfProductsInLocalStorage = productsFromLocalStorage.length;
  if(numberOfProductsInLocalStorage != 0) {
    return numberOfProductsInLocalStorage + 1;
  } else {
    return -1;
  }
  // const existingProduct = JSON.parse(localStorage.getItem('productId') || '{}');
  // if (localStorage.getItem('productId') != null){
  //   localStorage.setItem('productId', String(+localStorage.getItem('productId') + 1));
  //   return +localStorage.getItem('productId'); // + in front converts it to a number
  // } else {
  //   localStorage.setItem('productId', '-1');
  //   return -1;
  // }
}

}
