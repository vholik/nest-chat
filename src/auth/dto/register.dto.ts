import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @MinLength(8)
  password: string;
}

export default RegisterDto;
