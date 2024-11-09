//rajouter AuthorModule et Author

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './controllers/controller.module'; // Importe le module des contrôleurs
import { Book } from './entities/book.entity'; // Assure-toi que le chemin est correct



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Book], //rajouter Author,
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}


