import { Injectable } from '@angular/core';
import { Item } from './item'
import { Items } from './mock-items'

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItems(): Item[] {
    return Items;
  }

  getItem(id: number): Observable<Item> {
    console.log("in service getHero function", id);
    return of(Items.find(item => item.id === id));
  }

  cartArray = []

  addToCart(item: Item): Observable<Item[]> {

    if (this.cartArray.length == 0) {
      this.cartArray.push(item);
    }

    var idArray = [];

    for (var i = 0; i < this.cartArray.length; i++) {
      if (idArray.indexOf(this.cartArray[i].id) == -1) {
        idArray.push(this.cartArray[i].id)
      }
    }

    //item already exists in cartArray, don't push rather update quantity count
    if (idArray.indexOf(item.id) == -1) {
      console.log("item successfully got pushed to idArray", idArray);
      item.count = item.count + 1;
      this.cartArray.push(item);
    } else {
      //this else executes when user clicks on add to cart for the second time and so on, item quantity count key should be updated
      //for that find item in cartArray and push 
      for (var i=0; i < this.cartArray.length; i++) {
       if (this.cartArray[i].id == item.id) {
        this.cartArray[i].count = this.cartArray[i].count + 1;
       }
      } 
    }

    console.log("cartArray after push", this.cartArray);
    return of(this.cartArray);
  }

  getCartList() :Observable<Item[]> {
    return of(this.cartArray)
  }
}
