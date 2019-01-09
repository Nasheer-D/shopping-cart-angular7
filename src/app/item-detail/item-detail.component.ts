import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../item'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService }  from '../items.service';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { GET_ITEM } from '../actions';

import { Observable, of } from 'rxjs';

import { ADD_TO_CART } from '../actions';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

// @Input() item: Item;

export class ItemDetailComponent implements OnInit {
  
  @select() selectedItem: Observable<IAppState>;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location,
    private ngRedux: NgRedux<IAppState>
  ) { }
  
  // item: Item;

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log("id in component", id);
    // this.itemsService.getItem(id)
    //   .subscribe(item => this.item = item)

    // use reducer to get Item
    this.ngRedux.dispatch({type: GET_ITEM, id: id});
    console.log("selectedItem object after dispatch", this.selectedItem);
  }
  
  addToCart() {
    console.log("addToCart click item is", this.selectedItem);
    // this.itemsService.addToCart(this.selectedItem);
    this.ngRedux.dispatch({type: ADD_TO_CART});
    console.log("selectedItem in addToCart function()");
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getItem();
  }

}
