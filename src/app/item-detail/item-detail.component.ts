import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../item'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService }  from '../items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

// @Input() item: Item;

export class ItemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location
  ) { }
  
  item: Item;

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("id in component", id);
    this.itemsService.getItem(id)
      .subscribe(item => this.item = item)
  }
  
  addToCart() {
    console.log("addToCart click item is", this.item);
    this.itemsService.addToCart(this.item)
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getItem();
  }

}
