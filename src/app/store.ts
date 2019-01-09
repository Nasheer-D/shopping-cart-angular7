import { Item } from './item';

import { ADD_TO_CART } from './actions';

import { GET_ITEM } from './actions';

import { GET_CART_ITEMS } from './actions';

import { SEARCH_IN_ITEMS } from './actions'

export interface IAppState {
    items: Item[];
    selectedItem: Item;
    cartItems: Item[];
    searchVal: string;
}

export const INITIAL_STATE: IAppState = {
    items: [
        {
            id: 1,
            imgPath: "assets/images/bball.jpeg",
            title: "Basketball",
            prize: "$25",
            count: 0
        }, {
            id: 2,
            imgPath: "assets/images/celtics-jersey.jpg",
            title: "Celtics Jersey",
            prize: "$150",
            count: 0
        }, {
            id: 3,
            imgPath: "assets/images/macbook.jpg",
            title: "Macbook",
            prize: "$2500",
            count: 0
        }
    ],
    selectedItem: new Item,
    cartItems: [],
    searchVal: ""
}

var idArray = [];

export function rootReducer(state: IAppState, action): IAppState {
    console.log("state in rootreducer-store.ts file", state)
    switch (action.type) {

        case ADD_TO_CART:
            console.log("dispatched ADD_TO_CARD CASE MATCH, action::", action, "state::", state);

            if (state.cartItems.length == 0) {
                state.cartItems.push(state.selectedItem);
            }

            for (var i = 0; i < state.cartItems.length; i++) {
                if (idArray.indexOf(state.cartItems[i].id) == -1) {
                    idArray.push(state.cartItems[i].id)
                }
            }

            //item already exists in cartArray, don't push rather update quantity count
            if (idArray.indexOf(state.selectedItem.id) == -1) {
                console.log("item successfully got pushed to idArray", idArray);
                state.selectedItem.count = state.selectedItem.count + 1;
                state.cartItems.push(state.selectedItem);
            } else {
                //this else executes when user clicks on add to cart for the second time and so on, item quantity count key should be updated
                //for that find item in cartArray and push 
                for (var i = 0; i < state.cartItems.length; i++) {
                    if (state.cartItems[i].id == state.selectedItem.id) {
                        state.cartItems[i].count = state.cartItems[i].count + 1;
                    }
                }
            }

            console.log("idArray", idArray);

            console.log("in add to cart after push", state.cartItems);

            return state;

        case GET_ITEM:
            console.log("dispatched GET_ITEM CASE MATCH, action::", action, "state::", state);
            // use action.id and return found element by id
            var selectedItem = state.items.find(item => item.id === action.id);
            console.log("selectedItem", selectedItem);

            return Object.assign({}, state, {
                selectedItem: selectedItem
            })

        case GET_CART_ITEMS:
            console.log("dispatched GET_CART_ITEMS, action::", action, "state::", state);
            return Object.assign({}, state)

        case SEARCH_IN_ITEMS:
            console.log("dispatched SEARCH_IN_ITEMS, action::", action, "state::", state);
            var updatedList = []
            updatedList = state.items
            var indexArray = []

            if (action.searchVal.length == 0) {
                var allElements = INITIAL_STATE.items;
            }

            // apply the filter logic and update the shopping cart items
            if (action.searchVal.length > 0) {
                // console.log("this.state.shoppingItemsData", this.state.shoppingItemsData);
                updatedList = updatedList.map((item, index) => {

                    if (item.title.toLowerCase().search(action.searchVal.toLowerCase()) > -1) {
                        console.log("updatedList array for filter, MATCH FOUND", item, "props if class shoppingitems, INDEX::", index);
                        return item;
                    } else {
                        indexArray.push(index)
                        return index;
                    }

                })

                console.log("final updated list based on map function", updatedList, "indexArray", indexArray);

                //iterate over indexArray and splice updatedList array with index from indexArray
                for (var i = 0; i < indexArray.length; i++) {
                    console.log("updatedList in for splicing", updatedList)

                    //after splice reduce array number by one to avoid inconsistency
                    if (indexArray[i] > 0 && i != 0) {
                        indexArray[i] = indexArray[i] - i;
                    }

                    updatedList.splice(indexArray[i], 1);

                }

                console.log("after splice updatedList::", updatedList);
            } else {
                updatedList = allElements
                console.log("in-else, updatedList", updatedList)
            }

            return Object.assign({}, state, { items: updatedList })

        default:

            return state;
    }
}