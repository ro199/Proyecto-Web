import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { UsuarioCreateDto } from './dto/usuario.create-dto';
import { UsuarioService } from './usuario.service';
var md5 = require('md5');

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @Get()
  async mostrarTodos() {
    try {
      return await this._usuarioService.buscarTodos();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const usuarioValido = new UsuarioCreateDto();
    usuarioValido.cedula = parametrosCuerpo.cedula;
    usuarioValido.nombre = parametrosCuerpo.nombre;
    usuarioValido.apellido = parametrosCuerpo.apellido;
    usuarioValido.telefono = parametrosCuerpo.telefono;
    usuarioValido.correo_electronico = parametrosCuerpo.correo_electronico;
    parametrosCuerpo.password = md5(parametrosCuerpo.password);
    usuarioValido.password = parametrosCuerpo.password;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(usuarioValido);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        throw new BadRequestException({
          mensaje: 'Error validando datos',
        });
      } else {
        respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
      }
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
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

  @Get('vista/usuario')
  vistaUsuario(@Res() res) {
    res.render('inicio', {});
  }
}
