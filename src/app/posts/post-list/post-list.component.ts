import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: 'First Post', content: 'This is content of First post' },
  //   { title: 'Second Post', content: 'This is content of Second post' },
  //   { title: 'Third Post', content: 'This is content of Third post' }
  // ];

   posts: Post[] = [];
   postsSub: Subscription;

  constructor( public postsServ: PostsService ) { }

  ngOnInit() {
    this.postsServ.getPosts();
    this.postsSub = this.postsServ.getPostUpdateListener()
                .subscribe((posts) => {
                    this.posts = posts;
                });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }



}
