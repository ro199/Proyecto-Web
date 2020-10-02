import {
  IsAlpha,
  IsISBN,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsHash,
  IsPhoneNumber,
} from 'class-validator';

export class UsuarioCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  apellido: string;

  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  @IsString()
  cedula: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('EC')
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
