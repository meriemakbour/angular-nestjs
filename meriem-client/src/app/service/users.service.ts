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