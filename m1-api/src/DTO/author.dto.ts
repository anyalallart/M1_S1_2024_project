import { Book } from "src/entities/book.entity";

export class CreateAuthorDto {
    name: string;
    birthDate: string;
    DeathDate: string;
    books: Book[];
}

