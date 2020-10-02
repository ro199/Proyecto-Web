import {
  IsAlpha,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

import { Type } from 'class-transformer';

export class OfertaCreateDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @Type(() => Number)
  porcentaje: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  link_web: string;

  @IsNotEmpty()
  @IsString()
  fecha_inicio: string;

  @IsNotEmpty()
  @IsString()
  fecha_fin: string;

}
