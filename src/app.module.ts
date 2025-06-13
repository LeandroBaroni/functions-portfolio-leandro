import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ArticleModule } from './http/articles/article.module';
import { AuthModule } from './http/auth/auth.module';
import { FirebaseModule } from './http/firebase/firebase.module';
import { UserModule } from './http/users/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FirebaseModule.forRoot(), AuthModule, UserModule, ArticleModule],
  providers: [AppService],
})
export class AppModule {}
