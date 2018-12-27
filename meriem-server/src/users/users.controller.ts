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
