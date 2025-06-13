import { Article } from '@models/Article';
import { Injectable } from '@nestjs/common';
import { AddDocument } from '@typings/typings';
import { ArticleRepository } from 'src/core/repositories/Article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async create(data: AddDocument<Article>) {
    await this.articleRepository.add(data);
  }

  async getAll() {
    const documents = await this.articleRepository.getAll();

    return documents;
  }

  async getById(id: string): Promise<Article> {
    const document = await this.articleRepository.getById(id);

    return document;
  }
}
