# Gestion des utilisateurs et posts avec Angular et Nestjs

Projet de gestion des utilisateurs et posts, realise par Meriem Akbour GLSID 2 ENSET Mohammedia.

Le projet utilise :
- Angular pour le Front-end
- NestJS pour le back-end

Le projet permet d'ajouter, supprimer, modifier et recuperer des utilisateurs genere par Faker. 

Ainsi il permet d'ajouter, supprimer, modifier et recuperer des posts par utilisateur.

## Interface de la liste des utilisateurs

![screenshot_2](https://user-images.githubusercontent.com/46202333/50497028-3d9c4100-0a2c-11e9-80e9-9206bd2cda88.png)

## Interface des posts de chaque utilisateur

![screenshot_3](https://user-images.githubusercontent.com/46202333/50497037-50167a80-0a2c-11e9-9b7c-d24e52b33bb2.png)

## Interface d'ajout utilisateurs

![screenshot_4](https://user-images.githubusercontent.com/46202333/50497050-63294a80-0a2c-11e9-816a-ad4e73b53385.png)

## Interface de modification des utilisateurs

![screenshot_5](https://user-images.githubusercontent.com/46202333/50497051-66243b00-0a2c-11e9-9fb3-5d306d94c4a1.png)

## Interface de modification des posts

![screenshot_6](https://user-images.githubusercontent.com/46202333/50497052-67edfe80-0a2c-11e9-82fe-f3c7fb9c6d20.png)

## Quelque snippets du code

### Ce service permet d'envoyer des requetes HTTP au serveur pour manipuler les donnees des utilisateurs

```

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {

    host : string = "http://localhost:3000";

    constructor(private http: HttpClient){}

    /* Envoyer la requete d'ajout d'un utilisateur au serveur */
    addUser(user){
        return this.http.post(this.host + "/users", user, {observe:'response'});
    }

    /* Envoyer la requete de recuperation des utilisateurs au serveur */
    getUsers(){
        return this.http.get(this.host + "/users");
    }

    /* Envoyer la requete de recuperation d'un utilisateur au serveur */
    getUserById(id){
        return this.http.get(this.host + "/users/"+id);
    }

    /* Envoyer la requete de suppression utilisateurs au serveur */
    removeUsers(id){
        return this.http.delete(this.host + "/users/"+id);
    }

    /* Envoyer la requete de mise a jour des utilisateurs au serveur */
    updateUsers(user){
        return this.http.put(this.host + "/users", user);
    }

}

```

### Ce service permet d'envoyer des requetes HTTP au serveur pour manipuler les donnees les posts

```

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostService {

    host : string = "http://localhost:3000";

    constructor(private http: HttpClient){}

    /* Envoyer la requete d'ajout d'un post au serveur */
    addPost(post){
        return this.http.post(this.host + "/posts", post, {observe:'response'});
    }

    /* Envoyer la requete de recuperation des posts par utilisateur au serveur */
    getUserPosts(id){
        return this.http.get(this.host + "/posts/"+id);
    }

    /* Envoyer la requete de recuperation des posts au serveur */
    getPosts(){
        return this.http.get(this.host + "/posts");
    }

    /* Envoyer la requete de suppression des posts au serveur */
    removePosts(id){
        return this.http.delete(this.host + "/posts/"+id);
    }

    /* Envoyer la requete de mise a jour des posts au serveur */
    updatePosts(post){
        return this.http.put(this.host + "/posts", post);
    }

}

```

### Ce composant permet d'effectuer des operations aux utilisateurs depuis la vue

```

import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/users.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users : any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
    });

  }

  /* Supprimer un utilisateur */
  removeUser(id){
    this.userService.removeUsers(id).subscribe((users)=>{
      this.users = users;
    });
  }

  /* Mettre a jour un utilisateur */
  updateUser(user){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user" : user
      }
    };

    this.router.navigate(["/update"], navigationExtras);
    
  }


}


```

### Cette vue permet d'afficher la liste des utilisateurs et des boutons pour les manipuler

```

<div class="container">
  <br>
  <div>
    
    <span style="font-size: 4em; margin-right: 30px">Users List</span>  <a style="font-size:2em; font-weight: bold; text-decoration: none" [routerLink]="[ '/add']">Add User</a> 


  </div>
  <br>
  <br>

  <div class="row" style="margin-bottom:10px" *ngFor="let user of users">
    <div class="col-md-3 col-sm-4 col-lg-2">
      <img src={{user.avatarURL}} class="rounded-circle" />
    </div>
    <div class="col-md-4 col-sm-5 col-lg-3">
        <h5>{{user.name}}</h5>
        <h6>{{user.email}}</h6>
        <p>{{user.country}}</p>
    </div>
     
    <div class="col-md-3 col-sm-4 col-lg-2">
        <a style="color:black; text-decoration: none" [routerLink]="[ '/userposts', user.id ]">Show Posts</a><br>
        <a style="color:black; text-decoration: none" [routerLink]="[ '/update', user ]">Update</a><br>
        <button style="padding:0;border:none; background:none; color:red;font-weight: bold" (click)="removeUser(user.id)">Remove</button><br>
        
    </div>
  </div>


</div>

```

### Ce service de NestJS permet de generer les posts et definit des methodes pour la manipulation de ces posts

```

import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { PostsDTO } from 'src/dto/posts.dto';

@Injectable()
export class PostsService {

    posts : any[];

    constructor(){
        /* Remplir la liste par 20 posts en utilisant Faker */
        this.posts = new Array(20).fill(1).map((post, i) => {
            return {
                id: i,
                content: faker.lorem.paragraphs(),
                date: faker.date.past(),
                userId: Math.floor(0 + Math.random() * 5)
            };
        });

    }

    /* Recuperer les posts */
    findAll(){
        return this.posts;
    }

    /* Recuperer les posts d'un utilisateur */
    getPostsByUserId(userId){
        return this.posts.filter( post => post.userId == userId);
    }

    /* Ajouter un post */
    addpost(postsDTO: PostsDTO){

        let post = {
            id : this.generateId(),
            content: postsDTO.content,
            date: postsDTO.date,
            userId: postsDTO.userId
        }

        this.posts.push(post);

        return post;
    }

    /* Supprimer un post */
    removepost(id: number){
        this.posts = this.posts.filter(post => post.id != id);
        return this.posts;
    }

    /* Mettre a jour un post */
    updatepost(postsDTO: PostsDTO){
        let post = this.posts.find(post => post.id == postsDTO.id);
        post.content = postsDTO.content;
        post.date = postsDTO.date;
        post.userId = postsDTO.userId;
    }

    /* Generer un identifiant */
    generateId(){
        return Math.max(...this.posts.map(e => e.id)) + 1;
    }

}


```

### Ce service de NestJS permet de generer les utilisateurs et definit des methodes pour la manipulation

```

import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { UsersDTO } from 'src/dto/users.dto';

@Injectable()
export class UsersService {

    users : any[];

    constructor(){
        /* Generer 5 utilisateurs avec Faker */
        this.users = new Array(5).fill(1).map((user, i) => {
            return {
                id: i,
                name: faker.name.firstName() + ' ' + faker.name.lastName(),
                email: faker.internet.email(),
                country: faker.address.country(),
                avatarURL: faker.image.avatar()

            };
        });

    }

    /* Recuperer tous les utilisateurs */
    findAll(){
        return this.users;
    }
    
    /* Recuperer un utilisateur par ID */
    getUserById(id){
        console.log(id);
        return this.users.find(user => user.id == id);
    }

    /* Ajouter un utilisateur */
    addUser(usersDTO: UsersDTO){

        let user = {
            id : this.generateId(),
            name: usersDTO.name,
            email: usersDTO.email,
            country: usersDTO.country,
            avatarURL: faker.image.avatar()
        }

        this.users.push(user);

        return user;
    }

    /* Supprimer un utilisateur */
    removeUser(id: number){
        this.users = this.users.filter(user => user.id != id);
        return this.users;
    }

    /* Mettre a jour un utilisateur */
    updateUser(usersDTO: UsersDTO){
        let user = this.users.find(user => user.id == usersDTO.id);
        user.name = usersDTO.name;
        user.email = usersDTO.email;
        user.country = usersDTO.country;
        user.avatarURL = usersDTO.avatarURL;

    }

    /* Generer un identifiant */
    generateId(){
        return Math.max(...this.users.map(e => e.id)) + 1;
    }



}


```

### Controlleur qui definit l'API REST pour les posts

```
import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDTO } from 'src/dto/posts.dto';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){

    }

    @Get()
    findAll(){
        return this.postService.findAll();
    }

    @Get(":id")
    findByUserId(@Param('id') userId:number){
        return this.postService.getPostsByUserId(userId);
    }

    @Post()
    addPost(@Body() post: PostsDTO){
        return this.postService.addpost(post);
    }

    @Delete(':id')
    deletePost(@Param('id') id:number){
        return this.postService.removepost(id);
    }

    @Put()
    updatePost(@Body() post: PostsDTO){
        return this.postService.updatepost(post);
    }


}

```

### Controlleur qui definit l'API REST pour les utilisateurs

```
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from 'src/dto/users.dto';

@Controller('users')
export class UsersController {


    constructor(private userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(":id")
    getById(@Param('id') id:number){
        return this.userService.getUserById(id);
    }

    @Post()
    addContact(@Body() userDTO: UsersDTO){
        return this.userService.addUser(userDTO);
    }

    @Delete(":id")
    deleteuser(@Param('id') id:number){
        return this.userService.removeUser(id);
    }

    @Put()
    updateuser(@Body() userDTO: UsersDTO){
        return this.userService.updateUser(userDTO);
    }

}


```
