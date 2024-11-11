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
        console.log(`Received id: ${id}, book: ${book}`);
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
    /*
    //Récupérer les détails d'un auteur
    @Get('/:id')
async getAuthor(@Param('id') id: string): Promise<Author> {
  const author = await this.authorService.findOne(id);
  if (!author) {
    throw new NotFoundException('Auteur non trouvé');
  }
  return author;
    }
    //Modifier les informations d'un auteur
    @Put('/:id')
async updateAuthor(@Param('id') id: string, @Body() author: Author): Promise<Author> {
  return this.authorService.update(id, author);
    }
    //Supprimer un auteur
    @Delete('/:id')
async deleteAuthor(@Param('id') id: string): Promise<void> {
  return this.authorService.remove(id);
    }
    //Ajouter un livre à un auteur
    @Post()
async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
  return this.bookService.create(createBookDto);
    }
  */
}