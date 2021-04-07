import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit {

  pageTitle: string;

  constructor() {
    this.pageTitle = 'Guardar un nuevo video'
  }

  ngOnInit(): void {
  }

}
