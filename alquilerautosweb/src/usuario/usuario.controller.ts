import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Query,
  Res,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { UsuarioCreateDto } from './dto/usuario.create-dto';
import { UsuarioService } from './usuario.service';
var md5 = require('md5');

@Controller()
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

  @Post('registro/usuario')
  async registroVistaUsuario(
      @Body() parametrosCuerpo,
      @Res() res,
  ) {
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
        res.redirect('/registro?error=Error validando datos');
      } else {
        respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
      }
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error validando datos',
      });
      res.redirect('/registro?error=Error en el servidor')
    }
    if (respuesta) {
      const mensajeValido = 'El usuario se creo correctamente'
      return res.redirect('/login?mensaje='+mensajeValido);
    } else {
      throw new NotFoundException({
        mensaje: 'No existen registros',
      });
    }
  }

  @Get('inicio')
  inicio(@Res() res) {
    res.render('inicio/inicio');
  }

  @Get('nosotros')
  nosotros(@Res() res) {
    res.render('nosotros/nosotros');
  }

  @Get('agencias')
  agencias(@Res() res) {
    res.render('agencias/agencias');
  }

  @Get('administrador/perfil')
  administradorPerfil(
      @Res() res
  ){
    res.render('administrador/perfil-administrador');
  }

  @Get('registro')
  registroUsuario(
      @Res() res
  ){
    res.render('cliente/registro');
  }

  @Get('login')
  loginUsuario(
      @Res() res
  ){
    res.render('cliente/login');
  }

  @Get('perfil')
  perfilUsuario(
      @Res() res
  ){
    res.render('cliente/perfil');
  }

}
