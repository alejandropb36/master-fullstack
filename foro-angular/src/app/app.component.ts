import { Component , OnInit, DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Foro en angular';
  public identity: any;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    console.log(this.identity);
    console.log(this.token);
  }

  ngDoCheck(): void {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  logout(): void {
    localStorage.clear();
    this.identity = null;
    this.token = '';
    this._router.navigate(['/inicio']);
  }

}
