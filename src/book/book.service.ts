import { Injectable, NotFoundException} from "@nestjs/common"
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"
import { IBook } from "./book.model"
import { CreateBookDto } from "./dto/create-book.dto"
import { UpdateBookDto } from "./dto/update-book.dto"

@Injectable()
export class BookService{
    constructor(
        @InjectModel("Book") private readonly bookModel:Model<IBook>
    ){}

    async getBooks(){
        const books=await this.bookModel.find()
        if(books.length===0){
            throw new NotFoundException({
                Message:`Your book library is empty.`
            })
        }
        return books
    }

    async getBook(id:string){
        const book=await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException({
                Message:`The book you searched for was not found.`
            })
        }
        return book
    }

    async createBook(payload:CreateBookDto){
        const isExist= await this.bookModel.findOne({title:payload.title,author:payload.author})
        if(isExist)
        {
            throw new NotFoundException({
                Message:`The book already exists in your library.`
            })
        }
        const createdBook=new this.bookModel(payload)
        return await createdBook.save()
    }

    async updateBook(payload:UpdateBookDto,id:string){
        const updatedBook=await this.bookModel.findByIdAndUpdate(id,payload,{new:true})
        if(!updatedBook){
            throw new NotFoundException({
                Message:`The book you request to update was not found.`
            })
        }
        return updatedBook
    }

    async deleteBook(id:string){
        const deletedBook=await this.bookModel.findByIdAndDelete(id)
        if(!deletedBook){
            throw new NotFoundException({
                Message:`The book you request to delete was not found.`
            })
        }
        return deletedBook
    }
}