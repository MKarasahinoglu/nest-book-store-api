import {
    Controller,
    Get,
    Post,
    Patch,
    Delete, 
    Param,
    Body
} from "@nestjs/common"
import { BookService } from "./book.service"
import { CreateBookDto } from "./dto/create-book.dto"
import { UpdateBookDto } from "./dto/update-book.dto"

@Controller("books")
export class BookController{
    constructor(
        private readonly bookService:BookService
    ){}

    @Get()
    async getBooks(){
        return await this.bookService.getBooks()
    }
    
    @Get(":id")
    async getBook(@Param("id") id:string){
        return await this.bookService.getBook(id)
    }

    @Post()
    async createBook(@Body() createBookDto:CreateBookDto){
        return await this.bookService.createBook(createBookDto)
    }

    @Patch(":id")
    async updateBook(@Body() updateBookDto:UpdateBookDto,@Param("id") id:string)
    {
        return await this.bookService.updateBook(updateBookDto,id)
    }

    @Delete(":id")
    async deleteBook(@Param("id") id:string){
        return await this.bookService.deleteBook(id)
    }
}