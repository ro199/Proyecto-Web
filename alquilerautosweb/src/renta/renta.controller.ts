import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post, Res,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { RentaCreateDto } from './dto/renta.create-dto';
import { RentaService } from './renta.service';

@Controller()
export class RentaController {
  constructor(private readonly _rentaService: RentaService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._rentaService.buscarTodos();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }

  @Get('administrador/alquiler')
  administradorAlquiler(
      @Res() res
  ){
    res.render('administrador/alquiler-administrador');
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const rentaValido = new RentaCreateDto();
    rentaValido.tipo_auto = parametrosCuerpo.tipo_auto;
    rentaValido.total_pagar = parametrosCuerpo.total_pagar;
    rentaValido.metodo_pago = parametrosCuerpo.metodo_pago;
    rentaValido.lugar_entrega = parametrosCuerpo.lugar_entrega;
    rentaValido.lugar_recogida = parametrosCuerpo.lugar_recogida;
    rentaValido.fecha_entrega = parametrosCuerpo.fecha_entrega;
    rentaValido.fecha_recogida = parametrosCuerpo.fecha_recogida;
    rentaValido.estado = parametrosCuerpo.estado;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(rentaValido);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        throw new BadRequestException({
          mensaje: 'Error validando datos',
        });
      } else {
        respuesta = await this._rentaService.crearUno(parametrosCuerpo);
      }
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
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
