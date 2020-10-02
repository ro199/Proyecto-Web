import {
  IsNotEmpty, IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class PuntuacionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  numero_estrellas: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comentario: string;
}
