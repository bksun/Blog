import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';

  @Output() postCreated = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {

  }

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };

    this.postCreated.emit(post);

    }

}
