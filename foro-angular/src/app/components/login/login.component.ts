import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: User;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', false);
    this.identity = new User('', '', '', '', '', '', 'ROLE_USER', false);
    this.status = '';
    this.token = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.user);
    this._userService.login(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir token
          this._userService.login(this.user, true).subscribe(
            response => {
              if (response.token) {
                this.token = response.token;
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this._router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
