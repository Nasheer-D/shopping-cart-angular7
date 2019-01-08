import { Component, OnInit } from '@angular/core';
import { Item } from '../item'

// import { Items } from '../mock-items'
import { MatInputModule } from '@angular/material/input';
import { ItemsService } from '../items.service'

@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit { 

  constructor(private itemsService: ItemsService) { }

  items: Item[];
  
  getItems(): void {
    this.items = this.itemsService.getItems();
  }

  ngOnInit() {
    this.getItems();
  }

}
