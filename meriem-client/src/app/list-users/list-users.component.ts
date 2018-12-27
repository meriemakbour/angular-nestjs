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
