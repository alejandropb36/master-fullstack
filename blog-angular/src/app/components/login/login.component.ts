import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  token: string;
  identity: any;
  status: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = new User(null, '', '', 'ROLE_USER', '', '', '', '');
    this.logout();
  }

  onSubmit(form: NgForm): void {
    this.userService.singup(this.user).subscribe(
      response => {
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;
          this.userService.singup(this.user, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              console.log(this.token);
              console.log(this.identity);
              this.router.navigate(['inicio']);
            },
            error => {
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

  logout(): void {
    this.route.params.subscribe(params => {
      const logout = +params['sure'] as number;

      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        this.router.navigate(['inicio']);
      }
    });
  }
}
