import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[];
  @Input() identity: any;
  public url: string;

  constructor() { }

  ngOnInit(): void {
    this.url = global.url;
  }

}
