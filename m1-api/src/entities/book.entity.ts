import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type BookId = string & { __brand: 'Book' }; // branding spécial pour éviter les erreurs de type

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: BookId;

    @Column()
    title: string;

    @Column()
    publicationDate: string;

    @Column()
    author: string;

    @Column('float')
    price: number;
}
