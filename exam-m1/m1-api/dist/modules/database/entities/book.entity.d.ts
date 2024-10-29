import { BaseEntity } from 'typeorm';
import { AuthorEntity } from './author.entity';
export type BookId = string & {
    __brand: 'Book';
};
export declare class BookEntity extends BaseEntity {
    id: BookId;
    title: string;
    yearPublished: number;
    author: AuthorEntity;
}
