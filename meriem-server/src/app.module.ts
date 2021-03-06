import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [ UsersModule, PostsModule],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
