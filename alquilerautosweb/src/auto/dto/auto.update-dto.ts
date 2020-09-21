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

export class AutoUpdateDto {

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
