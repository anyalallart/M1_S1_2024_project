import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll({
                      search,
                      sortBy,
                  }: {
        search?: string;
        sortBy?: 'title' | 'date' | 'author';
    }): Promise<Book[]> {
        const query = this.bookRepository.createQueryBuilder('book');

        if (search) {
            query.where('book.title LIKE :search', { search: `%${search}%` });
        }

        if (sortBy) {
            query.orderBy(`book.${sortBy}`, 'ASC');
        }

        return query.getMany();
    }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }
}
