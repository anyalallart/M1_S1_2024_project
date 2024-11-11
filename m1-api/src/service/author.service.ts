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
        sortBy?: 'name' | 'birthDate' | 'deathDate' | 'books';
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
        const author = this.authorRepository.create({
            ...createAuthorDto,
            books: createAuthorDto.books || [],
        });
        return this.authorRepository.save(author);
    }

    async AddNewBookToAuthor(id: string, bookId: string): Promise<Author> {
        console.log(`Searching for author with id: ${id}`);
        const author = await this.authorRepository.findOneBy({ id });
        if (!author) {
            console.error(`Author with id ${id} not found`);
            throw new Error('Author not found');
        }
        if (!Array.isArray(author.books)) {
            author.books = [];
        }
        author.books.push(bookId);
        return this.authorRepository.save(author);
    }

    async remove(id: string): Promise<void> {
        await this.authorRepository.delete(id);
    }

    async RemoveBookFromAuthor(id: string, bookId: string): Promise<Author> {
        const author = await this.authorRepository.findOneBy({ id });
        if (!author) {
            throw new Error('Author not found');
        }
        if (!Array.isArray(author.books)) {
            author.books = [];
        }
        author.books = author.books.filter((b) => b !== bookId);
        return this.authorRepository.save(author);
    }
    //Récupérer les détails d'un auteur
    async findOne(id: string): Promise<Author | null> {
        return this.authorRepository.findOne(id);
    }
    //Modifier les informations d'un auteur
    async update(id: string, author: Author): Promise<Author> {
        await this.authorRepository.update(id, author);
        return this.authorRepository.findOne(id);
    }
    //Supprimer un auteur
    async remove(id: string): Promise<void> {
        await this.authorRepository.delete(id);
    }
    //Ajouter un livre à un auteur
    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }
}