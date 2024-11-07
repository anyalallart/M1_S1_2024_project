import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    // Obtenir la liste des livres avec option de tri et de recherche
    @Get()
    async getBooks(
        @Query('search') search: string,
        @Query('sortBy') sortBy: 'title' | 'date' | 'author',
    ): Promise<Book[]> {
        return this.bookService.findAll({ search, sortBy });
    }

    //Création un nouveau livre
    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
    }
}

