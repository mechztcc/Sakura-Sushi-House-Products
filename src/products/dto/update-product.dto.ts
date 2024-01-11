import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}
