import { BookId } from '../entities/book.entity'; //rajouter page auhthor
import {  AuthorId } from '../entities/author.entity';


export class AuthorModel {
    id: AuthorId;
    name: string;
    BirthDate: string;
    DeathDate: string;
    books: BookId[];   
}
