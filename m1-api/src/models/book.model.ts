import { BookId } from '../entities/book.entity'; //rajouter page auhthor
import { ratingModel } from './Rating.model';

export class BookModel {
    id: BookId;
    title: string;
    publicationDate: string;
    author: string; //mettre author
    price: number;
    rating?: ratingModel[];
}
