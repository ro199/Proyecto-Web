import {
  IsAlpha,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class OfertaCreateDto {
  @IsAlpha()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  porcentaje: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  link_web: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  fecha_inicio: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  fecha_fin: string;

  @IsNotEmpty()
  @IsDecimal()
  valor: number;
}
