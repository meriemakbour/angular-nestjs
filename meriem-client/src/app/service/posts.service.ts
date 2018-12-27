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