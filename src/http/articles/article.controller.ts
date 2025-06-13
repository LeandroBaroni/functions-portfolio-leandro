import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateDTO } from './dtos/create.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @HttpCode(201)
  async create(@Param() createDTO: CreateDTO) {
    const { description, title, cover, tagIds, topicId, userId, steps } = createDTO;

    console.log({ description, title, cover, tagIds, topicId, userId, steps });

    await this.articleService.create({
      cover,
      steps,
      title,
      topicId,
      userId,
      tagIds,
      description,
      active: true,
    });
  }

  @Get()
  @HttpCode(200)
  async get() {
    const results = await this.articleService.getAll();

    return results;
  }
}
