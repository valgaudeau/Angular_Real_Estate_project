import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack()
  {
    this.router.navigate(['/'])
  }

  onSubmit(form : NgForm){
    console.log(form);
  }

}
