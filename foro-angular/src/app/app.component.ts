import { Component , OnInit} from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit {
  public title = 'Foro en angular';
  public identity: any;
  public token: string;

  constructor(
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    console.log(this.identity);
    console.log(this.token);
  }

}
