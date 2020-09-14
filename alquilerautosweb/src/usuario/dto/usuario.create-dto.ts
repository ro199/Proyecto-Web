import {
  IsAlpha,
  IsISBN,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsHash,, IsPhoneNumber
} from 'class-validator';

export class UsuarioCreateDto {
  @IsAlpha()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  nombre: string;

  @IsAlpha()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  apellido: string;

  @IsISBN('10')
  @IsNotEmpty()
  @IsString()
  cedula: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('+593')
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  correo_electronico: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsHash('md5')
  password: string;
}
