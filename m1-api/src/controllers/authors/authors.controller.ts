import { Controller, Get, Post,Put, Delete, Patch, Body, Query } from '@nestjs/common';
import { Author} from '../../entities/author.entity';
import { AuthorService } from '../../service/author.service';
import { CreateAuthorDto } from 'src/DTO/author.dto';
import { create } from 'domain';

@Controller('api/authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()//Get all data from Authors
    async getAllAuthors(
        @Query('search') search?: string,
        @Query('sortBy') sortBy?: 'name' | 'birthDate' | 'deathDate' | 'books'
    ): Promise<Author[]> {
        return this.authorService.getAllAuthors({ search, sortBy });
    }
    @Put()//Create New Author
    async createauthor(@Body() createauthor: CreateAuthorDto): Promise<Author> {
        return this.authorService.create(createauthor);
    }
    @Post() // Add new book to author
    async AddNewBookToAuthor(@Body() body: { id: string, book: string }): Promise<Author> {
        const { id, book } = body;
        return this.authorService.AddNewBookToAuthor(id, book);
    }

    @Patch()//Remove book from author
    async RemoveBookFromAuthor(@Body() body:{id: string, book: string}): Promise<Author> {
        const { id, book } = body;
        return this.authorService.RemoveBookFromAuthor(id, book);
    }
    @Delete()//Delete author
    async remove(@Body() body:{id: string}): Promise<void> {
        const { id } = body;
        return this.authorService.remove(id);
    } 
}