import * as mongoose from "mongoose"

export const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number,
        required:true
    }
})

export interface IBook extends mongoose.Document{
    title:string
    author:string
    publishedYear:number
}