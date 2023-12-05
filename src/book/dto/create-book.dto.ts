import { IsNotEmpty,IsString,IsNumber } from "class-validator";

export class CreateBookDto{
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    author:string

    @IsNotEmpty()
    @IsNumber()
    publishedYear:number
}