import { Component } from '@angular/core';
import { AccountService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'carTrade';

  user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        console.log(this.user)
    }

    logout() {
        this.accountService.logout();
    }
}
