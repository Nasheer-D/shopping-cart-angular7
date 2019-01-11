import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService }  from '../items.service';
import { Item } from '../item'

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { GET_CART_ITEMS } from '../actions'

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {
  
  @select() cartItems:Item[];

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location,
    private ngRedux: NgRedux<IAppState>
  ) { }

  getCartList() :void{
    // this.itemsService.getCartList()
    //  .subscribe(cartArray => {
    //    this.cartArray = cartArray;
    //    this.dataSource = this.cartArray;
    // })
  
    // use reducer to get Item
    this.ngRedux.dispatch({type: GET_CART_ITEMS});
    
    console.log("this.ngRedux.getState()", this.ngRedux.getState());
  }
  
  displayedColumns: string[] = ['id', 'title', 'prize', 'quantity'];

  cart = this.ngRedux.getState().cartItems;

  ngOnInit() {
    this.getCartList();
  }

}
