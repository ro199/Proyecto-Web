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
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  nombre;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  numMotor;

  @IsNotEmpty()
  @IsDecimal()
  @IsNumber()
  @IsPositive()
  precio;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  source;
}
