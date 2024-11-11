import { Controller, Get, Post,Put,Delete, Body, Query } from '@nestjs/common';
import { Author } from '../../entities/author.entity';
import { AuthorService } from '../../service/author.service';
import { CreateAuthorDto } from 'src/DTO/author.dto';
import { create } from 'domain';

@Controller('api/authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    async getAllAuthors(
        @Query('search') search?: string,
        @Query('sortBy') sortBy?: 'name' | 'birthDate' | 'deathDate'
    ): Promise<Author[]> {
        return this.authorService.getAllAuthors({ search, sortBy });
    }
    @Put()
    async createauthor(@Body() createauthor: CreateAuthorDto): Promise<Author> {
        //affiche les données de createauthor
        console.log(createauthor.name);
        console.log('createauthor');
        return this.authorService.create(createauthor);
    }
    
}