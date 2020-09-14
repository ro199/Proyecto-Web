import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class PuntuacionCreateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  numero_estrellas: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comentario: string;
}
