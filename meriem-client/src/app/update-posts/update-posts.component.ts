import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/posts.service';

@Component({
  selector: 'app-update-posts',
  templateUrl: './update-posts.component.html',
  styleUrls: ['./update-posts.component.css']
})
export class UpdatePostsComponent implements OnInit {

  content: string;
  post: any;
  message: string;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    /* Recuperer le contenu du post pour remplir automatiquement le champ de texte */
    this.route.params.subscribe(param => {
      this.post = param;
      this.content = this.post.content;
    });


   }

  ngOnInit() {
  }

  /* Mettre a jour le contenu du post */
  updatePost(){
    let post = {
      id : this.post.id,
      content: this.content,
      date: this.post.date,
      userId: this.post.userId
    };
    this.postService.updatePosts(post).subscribe(data => {
      this.message = "Updated Successfully";
    }, err => {
      this.message = "Error updating post " + err; 
    });
  }

}
