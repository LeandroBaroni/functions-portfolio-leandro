import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateDTO } from './dtos/create.dto';
import { GetByIdDTO } from './dtos/GetById.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createDTO: CreateDTO) {
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

  @Get(':id')
  @HttpCode(200)
  async getById(@Param() data: GetByIdDTO) {
    const { id } = data;

    const article = await this.articleService.getById(id);

    return article;
  }
}
