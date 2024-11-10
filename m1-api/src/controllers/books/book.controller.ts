import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BookService } from '../../service/book.service';
import { Book } from '../../entities/book.entity';
import {CreateBookDto} from "../../DTO/book.dto";

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    // Route pour obtenir la liste des livres avec option de recherche et de tri
    @Get()
    async getBooks(
        @Query('search') search?: string,
        @Query('sortBy') sortBy?: 'title' | 'date' | 'author',
    ): Promise<Book[]> {
        return this.bookService.findAll({ search, sortBy });
    }

    // Route pour ajouter un nouveau livre
    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
    }
}
