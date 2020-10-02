import {
  IsAlpha,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class RentaCreateDto {

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsString()
  @IsNotEmpty()
  lugar_entrega: string;

  @IsString()
  @IsNotEmpty()
  lugar_recogida: string;

  @IsString()
  @IsNotEmpty()
  fecha_entrega: string;

  @IsString()
  @IsNotEmpty()
  fecha_recogida: string;

  @IsAlpha()
  @IsNotEmpty()
  estado: string;
}
