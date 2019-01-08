import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService }  from '../items.service';
import { Item } from '../item'

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location
  ) { }
  
  //To do -- get cartArray from service
  cartArray: Item[];
  dataSource: Item[];

  getCartList() :void{
    this.itemsService.getCartList()
     .subscribe(cartArray => {
       this.cartArray = cartArray;
       this.dataSource = this.cartArray;
    })
  }


  ngOnInit() {
    this.getCartList();
    console.log("cartArray", this.cartArray);
  }

}
