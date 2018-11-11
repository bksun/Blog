import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PostsService {

private  posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

  constructor( public http: HttpClient) { }

  getPosts() {
    this.http.get<{posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe(( postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost( title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((postData) => {
      console.log(postData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
