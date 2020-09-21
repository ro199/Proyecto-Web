import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post, Res,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { PuntuacionCreateDto } from './dto/puntuacion.create-dto';
import { PuntuacionService } from './puntuacion.service';

@Controller()
export class PuntuacionController {
  constructor(private readonly _puntuacionService: PuntuacionService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._puntuacionService.buscarTodos();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el servidor',
      });
    }
  }

  @Get('administrador/comentarios')
  administradorComentarios(
      @Res() res
  ){
    res.render('administrador/comentarios-administrador');
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const puntuacionValida = new PuntuacionCreateDto();
    puntuacionValida.numero_estrellas = parametrosCuerpo.numero_estrellas;
    puntuacionValida.comentario = parametrosCuerpo.comentario;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(puntuacionValida);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        throw new BadRequestException({
          mensaje: 'Error Validando Datos',
        });
      } else {
        respuesta = await this._puntuacionService.crearUno(parametrosCuerpo);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        mensaje: 'Error en el Servidor',
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
