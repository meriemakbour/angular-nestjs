import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/users.service';

@Component({
  selector: 'app-show-user-posts',
  templateUrl: './show-user-posts.component.html',
  styleUrls: ['./show-user-posts.component.css']
})
export class ShowUserPostsComponent implements OnInit {

  id: number;
  posts: any;
  user: any;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute) {
    /* Recuperer l'utilisateur et ses posts */
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.postService.getUserPosts(this.id).subscribe(posts => {
        this.posts = posts;
        this.sortPosts();
      });
      this.userService.getUserById(this.id).subscribe(user => this.user = user);
    });

   }

  ngOnInit() {
  }

  /* Supprimer un post par id */
  removePost(id){
    this.postService.removePosts(id).subscribe(posts => {
      this.postService.getUserPosts(this.id).subscribe(posts => {
        this.posts = posts;
        this.sortPosts();
      })
    });
  }

  /* Trier les posts par date */
  sortPosts(){
    this.posts.sort((post1, post2) => {
      let datePost1 = new Date(post1.date);
      let datePost2 = new Date(post2.date);
      
      if(datePost1 > datePost2){
          return -1;
      }else if(datePost1 < datePost2){
          return 1;
      }else{
          return 0;
      }
  });
  }

}
