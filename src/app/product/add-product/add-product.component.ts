import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProduct } from '../IProduct.interface';
import * as alertify from 'alertifyjs'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('Form')
  addProductForm!: NgForm;

  @ViewChild('formTabs', { static: false })
  formTabs?: TabsetComponent;

  // Think I need to convert my interface to a class to create the object I need here - See https://stackoverflow.com/questions/52616172/how-to-initialize-an-object-in-typescript
  productToAdd: IProduct = {
    id: 10, // This will be generated at the database level eventually, just a dummy for now. Setting it to 10 because we have 9 items in the JSON file, so first product we add to local storage should have id of 10
    name: 'default name',
    spaceshipOrRobot: -1,
    price: -1,
    age: -1,
    description: 'default description'
  }
  // productTypes: Array<string> = ['Spaceship', 'Robot'];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    // this.addPropertyForm.controls['Name'].setValue('Default Value');
    // setTimeout(() => {
    //   this.addProductForm.controls['Name'].setValue('Default Name');
    // }, 100)
  }

  // Getters to retrieve information about the status FormGroup controls in the HTML
  get basicInfoModelGroup() {
    return this.addProductForm.controls['BasicInfo'] as FormGroup;
  }

  get extraInfoModelGroup() {
    return this.addProductForm.controls['ExtraInfo'] as FormGroup;
  }

  onBack()
  {
    this.router.navigate(['/'])
  }

  onSubmit(){
    // If the invalid error comes from group 1, we need to move to that tab. We can use the getters to retrieve the status.
    // Logic: error comes from first tab, move view to first tab.
    if(this.basicInfoModelGroup.invalid) {
      if(this.formTabs){
        this.formTabs.tabs[0].active = true;
        alertify.set("notifier", "position", "top-center");
        alertify.error("You need to fill in all of the fields on this tab before you can save your product!")
        return;
      }
    }
    // console.log(form);
    alertify.set("notifier", "position", "top-center");
    alertify.success("You have successfully added a new product!")
    // console.log('spaceship or robot = ' + this.addProductForm.value.BasicInfo.spaceshipOrRobot);
    // console.log(this.addProductForm);
    this.mapFormDataToPropertyProduct();
    console.log(this.productToAdd);
    this.productService.addProduct(this.productToAdd);

    // The following code redirects the user to the robot page if they added a robot product, or main page if they added a spaceship
    if(this.addProductForm.value.BasicInfo.spaceshipOrRobot == 2){
      this.router.navigate(['robots']);
    } else {
      this.router.navigate(['/']);
    }
  }

    // this function maps the data we are receiving through our form to the productToAdd product
    mapFormDataToPropertyProduct(): void {
      this.productToAdd.id = this.productService.newProductId();
      // console.log("at this point, product id is " + this.productToAdd.Id);
      // I was forced to add this check here to fix the issue of the first created product being given NaN id. Couldn't figure out why the function isn't working, very weird.
      if(Number.isNaN(this.productToAdd.id)) {
        this.productToAdd.id = 10;
      }
      // console.log("at this next point, product id is " + this.productToAdd.Id);
      this.productToAdd.name = this.addProductForm.value.BasicInfo.Name;
      this.productToAdd.spaceshipOrRobot = this.addProductForm.value.BasicInfo.spaceshipOrRobot;
      this.productToAdd.price = this.addProductForm.value.BasicInfo.Price;
      // I'll implement image mapping later, I need to think about how to handle image uploads and such first
      // this.productToAdd.Image = this.addProductForm.value.ImageTab.Image;
      this.productToAdd.age = this.addProductForm.value.ExtraInfo.Age;
      this.productToAdd.description = this.addProductForm.value.ExtraInfo.Description;
    }

  // See https://valor-software.com/ngx-bootstrap/#/components/tabs?tab=overview - Documentation for all of this
  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  // see https://www.cloudhadoop.com/angular-number-validation-example/ for this function - Number validation in Angular
  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
