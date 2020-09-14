import {
  IsAlpha,
  IsISBN,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class UsuarioCreateDto {
  @IsAlpha()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  nombre: string;

  @IsAlpha()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  apellido: string;

  @IsISBN('10')
  @IsNotEmpty()
  @IsAlpha()
  cedula: string;

  @IsNotEmpty()
  @IsAlpha()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  correo_electronico: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
