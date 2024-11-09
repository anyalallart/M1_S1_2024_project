import { BookController } from '../controllers/books/book.controller';
import { Module } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../entities/book.entity';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BookController],
    providers: [BookService],
})
export class ControllerModule {}