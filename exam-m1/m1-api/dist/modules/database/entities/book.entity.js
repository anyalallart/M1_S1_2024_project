"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookEntity = void 0;
const typeorm_1 = require("typeorm");
const author_entity_1 = require("./author.entity");
let BookEntity = class BookEntity extends typeorm_1.BaseEntity {
};
exports.BookEntity = BookEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BookEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar' }),
    __metadata("design:type", String)
], BookEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year_published', type: 'int' }),
    __metadata("design:type", Number)
], BookEntity.prototype, "yearPublished", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.AuthorEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", author_entity_1.AuthorEntity)
], BookEntity.prototype, "author", void 0);
exports.BookEntity = BookEntity = __decorate([
    (0, typeorm_1.Entity)('books')
], BookEntity);
//# sourceMappingURL=book.entity.js.map