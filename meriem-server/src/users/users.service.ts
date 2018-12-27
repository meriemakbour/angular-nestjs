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
