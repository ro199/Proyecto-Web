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
  tipo_auto: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  total_pagar: number;

  @IsAlpha()
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
  @IsDate()
  fecha_entrega: string;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  fecha_recogida: string;

  @IsAlpha()
  @IsNotEmpty()
  estado: string;
}
