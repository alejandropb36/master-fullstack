import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public identity: any;
  public status: string;
  public token: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.pageTitle = 'Login';
    this.user = new User(null, '', '', '', '', 'ROLE_USER', null, false);
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(this.user);
    this.userService.signup(this.user).subscribe(
      response => {
        
        if (!response.status || response.status !== 'error') {
          this.status = 'success';
          this.identity = response;

          this.userService.signup(this.user, true).subscribe(
            response => {
              if (!response.status || response.status !== 'error') {
                this.status = 'success';
                this.token = response;
                console.log(this.identity);
                console.log(this.token);
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                this.router.navigate(['/inicio']);
              } else {
                this.status = response.status;
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );

        } else {
          this.status = response.status;
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
