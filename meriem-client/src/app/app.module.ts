import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { Routes, RouterModule } from '@angular/router';
import {Form, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserService } from './service/users.service';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { ShowUserPostsComponent } from './show-user-posts/show-user-posts.component';
import { PostService } from './service/posts.service';
import { UpdatePostsComponent } from './update-posts/update-posts.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'add', component: AddUserComponent},
  {path:'addpost/:id', component: AddPostComponent},
  {path:'users', component: ListUsersComponent},
  {path:'userposts/:id', component: ShowUserPostsComponent},
  {path:'update', component: UpdateUsersComponent},
  {path:'updatepost', component: UpdatePostsComponent},
  {path:'home', redirectTo: '', pathMatch: 'full'}
  
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AddUserComponent,
    ListUsersComponent,
    UpdateUsersComponent,
    ShowUserPostsComponent,
    UpdatePostsComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)
  ],
  providers: [UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
