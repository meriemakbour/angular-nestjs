import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { PostService } from '../service/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  content: string;
  userId: number;
  message: string;

  constructor(private route: ActivatedRoute, private postService: PostService) { 
    //Recuperer l'ID de l'utilisateur depuis les parametres
    this.route.params.subscribe( param => {
      this.userId = +param.id;
    });
  }

  ngOnInit() {
  }

  //Ajouter un post 
  add(){

    let post= {
      id: null,
      content: this.content,
      date: new Date(),
      userId: this.userId
    }
    this.postService.addPost(post).subscribe(data => {
      this.message = "Post added successfully";
    }, err => {
      this.message = "Error adding post";
    });
  }
}
