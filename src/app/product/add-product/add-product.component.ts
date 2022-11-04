import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import * as alertify from 'alertifyjs'

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

  // productTypes: Array<string> = ['Spaceship', 'Robot'];

  constructor(private router: Router) { }

  ngOnInit() {
    // this.addPropertyForm.controls['Name'].setValue('Default Value');

    // setTimeout(() => {
    //   this.addProductForm.controls['Name'].setValue('Default Name');
    // }, 100)
  }

  // Using these getters, we can retrieve information about the status FormGroup controls in the HTML
  get basicInfo() {
    return this.addProductForm.controls['BasicInfo'] as FormGroup;
  }

  get extraInfo() {
    return this.addProductForm.controls['ExtraInfo'] as FormGroup;
  }

  onBack()
  {
    this.router.navigate(['/'])
  }

  onSubmit(){
    // If the invalid error comes from group 1, we need to move to that tab. We can use the getters to retrieve the status
    // error comes from first tab, move view to first tab
    if(this.basicInfo.invalid) {
      if(this.formTabs){
        this.formTabs.tabs[0].active = true;
        alertify.set("notifier", "position", "top-center");
        alertify.error("You need to fill in all of the fields on this tab before you can save your product!")
        return;
      }
    }

    // if error comes from the last tab, move view to last tab
    // Don't need this one actually since if on last tab, can only save if all fields on the tab are filled & valid
    // if(this.extraInfo.invalid) {
    //   if(this.formTabs){
    //     this.formTabs.tabs[2].active = true;
    //     alertify.set("notifier", "position", "top-center");
    //     alertify.error("You need to fill in all of the fields on this tab before you can save your product!")
    //     return;
    //   }
    // }

    // console.log(form);
    console.log("The form has been submitted");
    console.log('spaceship or robot = ' + this.addProductForm.value.BasicInfo.spaceshipOrRobot);
    console.log(this.addProductForm);
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
