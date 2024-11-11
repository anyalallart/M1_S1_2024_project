import { BookId } from '../entities/book.entity'; //rajouter page auhthor
import { ratingModel } from './Rating.model';
import { Author, AuthorId } from '../entities/author.entity';


export class BookModel {
    id: BookId;
    title: string;
    publicationDate: string;
    author: AuthorId; //mettre author
    price: number;
    rating?: ratingModel[];
}
