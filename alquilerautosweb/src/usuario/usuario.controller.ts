import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._usuarioService.buscarTodos();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    let respuesta;
    try {
      respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
    } catch (e) {
      console.error(e);
      throw new BadRequestException({
        mensaje: 'Error validando datos',
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
