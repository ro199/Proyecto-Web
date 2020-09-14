import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { AutoService } from './auto.service';
import { AutoCreateDto } from './dto/auto.create-dto';

@Controller('autos')
export class AutoController {
  constructor(private readonly _autoService: AutoService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._autoService.buscarTodos();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el servidor',
      });
    }
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const autoValidado = new AutoCreateDto();
    autoValidado.nombre = parametrosCuerpo.nombre;
    autoValidado.numMotor = parametrosCuerpo.numMotor;
    autoValidado.precio = parametrosCuerpo.precio;
    autoValidado.source = parametrosCuerpo.source;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(autoValidado);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        throw new BadRequestException({
          mensaje: 'Error validando datos',
        });
      } else {
        respuesta = await this._autoService.crearUno(parametrosCuerpo);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el servidor',
      });
    }

    if (respuesta) {
      return respuesta;
    } else {
      throw new NotFoundException({
        mensaje: 'No existen registros',
      });
    }
  }
}
