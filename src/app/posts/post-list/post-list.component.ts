import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   { title: 'First Post', content: 'This is content of First post' },
  //   { title: 'Second Post', content: 'This is content of Second post' },
  //   { title: 'Third Post', content: 'This is content of Third post' }
  // ];

 @Input()  posts = [];

  constructor() { }

  ngOnInit() {
  }

}
