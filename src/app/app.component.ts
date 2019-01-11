import { Component } from '@angular/core';

import { ConfigService } from './config/config.service';
import { Config } from './config/config.service';

// import { UPDATE_USER_INFO } from './actions'

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart-angular7';

  constructor(
    private configService: ConfigService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit() { }
}
