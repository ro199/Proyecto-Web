import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Query, Req,
  Res, Session,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { UsuarioCreateDto } from './dto/usuario.create-dto';
import { UsuarioService } from './usuario.service';
var md5 = require('md5');

@Controller()
export class UsuarioController {
  constructor(
      private readonly _usuarioService: UsuarioService
  ) {}

  @Get('pp')
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

  @Post('registro')
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
        parametrosCuerpo.roles = "Cliente";
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
  inicio(
      @Res() res,
      @Session() session
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado){
      return res.render('inicio/inicio',
          {
            roles: session.usuario.roles
          }
      );
    }else {
      return res.render('inicio/inicio',
          {
            roles: []
          }
      );
    }

  }

  @Get('nosotros')
  nosotros(
      @Res() res,
      @Session() session
  ) {
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render('nosotros/nosotros',
          {
            roles: session.usuario.roles
          }
      );
    }else {
      return res.render('nosotros/nosotros',
          {
            roles: []
          }
      );
    }

  }

  @Get('agencias')
  agencias(
      @Res() res,
      @Session() session
  ) {
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render('agencias/agencias',
        {
          roles: session.usuario.roles
        }
      );
    }else{
      return res.render('agencias/agencias',
          {
            roles: []
          }
      );
    }

  }

  @Get('administrador/perfil')
  administradorPerfil(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render(
          'administrador/perfil-administrador',
          {
            usuario: session.usuario.usuario,
            roles: session.usuario.roles
          }
      );
    }else{
      return res.redirect('/login');
    }

  }

  @Get('registro')
  async registroUsuario(
      @Res() res,
      @Session() session
  ){
      const estaLogeado = session.usuario;
      if(estaLogeado){
        return res.render(
            'cliente/registro',
            {
              roles: session.usuario.roles
            }
        );
      }else{
        return res.render(
            'cliente/registro',
            {
              roles: []
            }
        );
      }

  }

  @Get('login')
  loginUsuario(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render(
          'cliente/login',
          {
            usuario: session.usuario.roles,
            roles: session.usuario.roles
          }
      );
    }else{
      return res.render(
          'cliente/login',
          {
            usuario: [],
            roles: []
          }
      );
    }
  }

  @Post('login')
  async loginVistaUsuario(
      @Res() res,
      @Body() parametrosCuerpo,
      @Session() session,
  ){
    if (parametrosCuerpo.email === 'admin@hotmail.com' && parametrosCuerpo.password === '1234') {
      session.usuario = {
        usuario: 'Administrador',
        userId: 0,
        roles: ['Administrador'],
      };
      res.redirect(
          '/administrador/perfil?mensaje=Bienvenido Administrador',
      );
    }
    else{
      let consultaServicio;
      consultaServicio = [
        {
          correo_electronico: parametrosCuerpo.email,
        }
      ];
      let usuario;
      try{
        usuario = await this._usuarioService.buscarUno(consultaServicio);
      }
      catch (e) {
        res.redirect(
            '/login?error=Error del Servidor',
        );
      }
      if (usuario){
        console.log(usuario.correo_electronico);
        if (usuario.password === md5(parametrosCuerpo.password)) {
          console.log(usuario.password + "/ " + parametrosCuerpo.password);
          session.usuario = undefined;
          session.usuario = {
            usuario: usuario.correo_electronico,
            userId: usuario.cedula,
            roles: ['Cliente'],
          };
          res.redirect('/perfil');
        }
        else{
          res.redirect(
              '/login?error=Credenciales Incorrectas',
          );
        }
      }
      else{
        res.redirect(
            '/login?error=Credenciales Incorrectas',
        );
      }

    }
    throw new BadRequestException('No envia credenciales');

  }


  @Get('perfil')
  perfilUsuario(
      @Res() res,
      @Session() session,
  ){
    const estaLogedo = session.usuario;
    if(estaLogedo){
      res.render(
          'cliente/perfil',
          {
            usuario: session.usuario.usuario,
            roles: session.usuario.roles
          }
      );
    }else{
      return res.redirect('/login');
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() res,
      @Req() req
  ) {
    session.usuario = undefined;
    req.session.destroy();
    res.redirect('/inicio');
  }

}
