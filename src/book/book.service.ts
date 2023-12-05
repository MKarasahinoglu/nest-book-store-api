import { Injectable } from "@nestjs/common"
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
        return await this.bookModel.find()
    }

    async getBook(id:string){
        return await this.bookModel.findById(id)
    }

    async createBook(payload:CreateBookDto){
        const createdBook=new this.bookModel(payload)
        return await createdBook.save()
    }

    async updateBook(payload:UpdateBookDto,id:string){
        const updatedBook=await this.bookModel.findByIdAndUpdate(id,payload,{new:true})
        return updatedBook
    }

    async deleteBook(id:string){
        const deletedBook=await this.bookModel.findByIdAndDelete(id)
        return deletedBook
    }
}