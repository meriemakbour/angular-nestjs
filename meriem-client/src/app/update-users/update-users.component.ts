import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/users.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  user: any;
  name:string;
  email:string;
  country: string;
  avatarURL:string;
  message: string;
  

  constructor(private router: ActivatedRoute, private userService: UserService) { 

    /* Recuperer les informations de l'utilisateur depuis les parametres */
    this.router.params.subscribe((item) => {
      this.user = item;
      this.name = this.user.name;
      this.email = this.user.email;
      this.country = this.user.country;
      this.avatarURL = this.user.avatarURL;
    });

  }

  ngOnInit() {

  }

  /* Mettre a jour l'utilisateur */
  updateUser(){
    const con = {
      id : this.user.id,
      name: this.name,
      email: this.email,
      country: this.country,
      avatarURL: this.avatarURL
    }
    this.userService.updateUsers(con).subscribe(()=>{
      this.message = "Updated successfully";
    }, err => {
      this.message = "Error updating user";
    });
  }

}
