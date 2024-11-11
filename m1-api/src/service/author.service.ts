import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { CreateAuthorDto } from '../DTO/author.dto';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) {}

    async getAllAuthors({
                      search,
                      sortBy,
                  }: {
        search?: string;
        sortBy?: 'name' | 'birthDate' | 'deathDate';
    }): Promise<Author[]> {
        const query = this.authorRepository.createQueryBuilder('author');

        if (search) {
            query.where('author.name LIKE :search', { search: `%${search}%` });
        }

        if (sortBy) {
            query.orderBy(`author.${sortBy}`, 'ASC');
        }

        return query.getMany();
    }

    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create(createAuthorDto);
        return this.authorRepository.save(author);
    }
}