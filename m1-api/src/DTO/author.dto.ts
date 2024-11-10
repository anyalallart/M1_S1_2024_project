import { Book } from "src/entities/book.entity";

export class CreateAuthorDto {
    name: string;
    birthDate: Date;
    DeathDate: Date;
    books: Book[];
}

