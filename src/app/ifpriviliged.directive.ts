import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';

import { GET_USER_INFO } from './actions';
import { UPDATE_USER_INFO } from './actions';

import { ConfigService } from './config/config.service';
import { Config } from './config/config.service';

import { Item } from './item';

@Directive({
  selector: '[appIfprivileged]'
})
export class IfprivilegedDirective {

  private config: Config[];

  private hasView = false;

  constructor(
    private configService: ConfigService,
    private el: ElementRef,
    private ngRedux: NgRedux<IAppState>,
    // private templateRef: TemplateRef<any>,
    // private viewContainer: ViewContainerRef
  ) {
    // this.showIfPrivileged();
  }

  showIfPrivileged() {
    /*
    this.configService.getConfig()
      .subscribe((data: Config[]) => {
        this.config = data,
          console.log("this.config in subscribe", this.config);
        //dispatch an action to update store with user information
        this.ngRedux.dispatch({ type: UPDATE_USER_INFO, userInfo: this.config });
        // a way to call getstate and access data in store
        console.log("this.ngRedux.getState() after dispatch of setuserprofile", this.ngRedux.getState());
      
        if(this.config[0].FirstName == "User2") {
          console.log("about to hide div element for user1");
          this.el.nativeElement.style.display = 'none';
        } else {
          this.el.nativeElement.style.backgroundColor = 'green';
        }
      })
      */

     let cart = this.ngRedux.getState().cartItems;
     if(cart!=null && cart.length>0) {
      console.log("in cart array length > 1");
      this.el.nativeElement.style.backgroundColor = 'green';
     } else {
      console.log("in cart array length = 0");
      this.el.nativeElement.style.backgroundColor = 'red';
     }
  }

  @Input() set appIfprivileged(cart: Array<any>) {
    // if (!condition && !this.hasView) {
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    //   this.hasView = true;
    // } else if (condition && this.hasView) {
    //   this.viewContainer.clear();
    //   this.hasView = false;
    // }
    console.log("@input selector in directive", cart);
    if(cart!=null && cart.length>0) {
      console.log("in cart array length > 1");
      this.el.nativeElement.style.backgroundColor = 'green';
     } else {
      console.log("in cart array length = 0");
      this.el.nativeElement.style.backgroundColor = 'red';
     }
  }

}

