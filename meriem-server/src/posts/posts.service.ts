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
