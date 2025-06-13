import { Module } from '@nestjs/common';
import { ArticleRepository } from 'src/core/repositories/Article.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  exports: [ArticleService, ArticleRepository],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
