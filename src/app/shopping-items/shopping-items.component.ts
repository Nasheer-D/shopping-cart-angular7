import { Component, OnInit } from '@angular/core';
import { Item } from '../item'

// import { Items } from '../mock-items'
import { MatInputModule } from '@angular/material/input';
import { ItemsService } from '../items.service'

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { Items } from '../mock-items';

import { SEARCH_IN_ITEMS } from '../actions';

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit { 
  
  @select() items; //from store

  @select() searchVal;

  // box = {value:''};

  // searchVal: string = "";

  constructor(
    private itemsService: ItemsService,
    private ngRedux: NgRedux<IAppState>
    ) { }

  ngOnInit() { }

  onKey(box: any) {
    console.log("in onKey func",box.value)
    //dispatch with searchVal and set searchVal(using which apply filtering in shopping-items component)
    this.ngRedux.dispatch({type: SEARCH_IN_ITEMS, searchVal: box.value});
  }

}
