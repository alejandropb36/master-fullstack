import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  pageTitle: string;
  post: Post;

  constructor() { }

  ngOnInit(): void {
    this.pageTitle = 'Crear nueva entrada';
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

}
