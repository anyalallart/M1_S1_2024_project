import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity'; // Adjust the import path as necessary

export type AuthorId = string & { __brand: 'Author' }; // branding spécial pour éviter les erreurs de type

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: AuthorId;

    @Column()
    name: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ nullable: true })
    deathDate: Date;

    @OneToMany(() => Book, book => book.author)
    books: Book[];
}