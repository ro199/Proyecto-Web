import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { OfertaCreateDto } from './dto/oferta.create-dto';
import { OfertaService } from './oferta.service';

@Controller('oferta')
export class OfertaController {
  constructor(private readonly _ofertaService: OfertaService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._ofertaService.buscarTodos();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el sevidor',
      });
    }
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const ofertavalida = new OfertaCreateDto();
    ofertavalida.nombre = parametrosCuerpo.nombre;
    ofertavalida.descripcion = parametrosCuerpo.descripcion;
    ofertavalida.porcentaje = parametrosCuerpo.porcentaje;
    ofertavalida.link_web = parametrosCuerpo.link_web;
    ofertavalida.fecha_inicio = parametrosCuerpo.fecha_inicio;
    ofertavalida.fecha_fin = parametrosCuerpo.fecha_fin;
    ofertavalida.valor = parametrosCuerpo.valor;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(ofertavalida);
      if (errores.length > 0) {
        console.log('Errores: ', errores);
        throw new BadRequestException({
          mensaje: 'Error validando datos',
        });
      } else {
        respuesta = await this._ofertaService.crearUno(parametrosCuerpo);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el servidor',
      });
    }
  }
}
