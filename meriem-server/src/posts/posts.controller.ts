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
