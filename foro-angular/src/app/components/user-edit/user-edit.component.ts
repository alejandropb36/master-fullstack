import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: any;
  public token: string;
  public afuConfig: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', false);
    this.status = '';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg, .jpeg, .png, .gif',
      maxSize: '50',
      uploadAPI: {
        url: global.url + 'upload-avatar/' + this.user._id,
        headers: {
          'Authorization': this.token
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: true,
      replaceTexts: {
        attachPinBtn: 'Sube tu foto',
      }
    };
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

  avatarUpload(data: any): void {
    console.log(data.body);
    this.user.image = data.body.user.image;
    console.log(this.user);
  }

}
