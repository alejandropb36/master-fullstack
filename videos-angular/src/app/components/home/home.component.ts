import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageTitle: string;
  public identity: any;

  constructor(private userService: UserService) {
    this.pageTitle = 'Inicio';
  }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
  }

}
