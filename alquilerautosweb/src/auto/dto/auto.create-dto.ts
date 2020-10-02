import {
  IsAlpha,
  IsAlphanumeric,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class AutoCreateDto {

  @IsString()
  @IsNotEmpty()
  nombre;

  @IsString()
  @IsNotEmpty()
  numMotor;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  source;
}
