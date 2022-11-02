import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

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

  constructor(private router: Router) { }

  ngOnInit() {
    // this.addPropertyForm.controls['Name'].setValue('Default Value');

    setTimeout(() => {
      this.addProductForm.controls['Name'].setValue('Default Value');
    }, 100)
  }

  onBack()
  {
    this.router.navigate(['/'])
  }

  onSubmit(){
    // console.log(form);
    console.log(this.addProductForm);
  }

  // See https://valor-software.com/ngx-bootstrap/#/components/tabs?tab=overview - Documentation for all of this
  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

}
