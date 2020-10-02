import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Res, Session,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { PuntuacionCreateDto } from './dto/puntuacion.create-dto';
import { PuntuacionService } from './puntuacion.service';
import {AutoService} from "../auto/auto.service";
import {UsuarioService} from "../usuario/usuario.service";

@Controller()
export class PuntuacionController {
  constructor(private readonly _puntuacionService: PuntuacionService, private readonly _usuarioService: UsuarioService) {}

  @Get('mm')
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
  async administradorComentarios(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      let resultadoEncontrado;
      try{
        resultadoEncontrado = await this._puntuacionService.buscarTodos();
      }catch (e) {
        console.error(e);
        throw new InternalServerErrorException({
          mensaje: 'Error econtrando puntuaciones'
        })
      }
      if(resultadoEncontrado){
        const usuario = resultadoEncontrado.map((user) => user.usuario);
        const nombreUsuario = usuario.map(u => u.nombre)
        res.render(
            'administrador/comentarios-administrador',
            {
              roles: session.usuario.roles,
              puntuaciones: resultadoEncontrado,
              nombreUsuario: nombreUsuario
            }
        );
      }else{
        throw new NotFoundException('No se enontraron puntuaciones')
      }

    }else {
      return res.redirect('/login');
    }

  }

  @Get('comentarios/:id')
  async comentarios(
      @Res() res,
      @Param() parametrosRuta,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    const id = Number(parametrosRuta.id);
    if(estaLogeado){
      res.render(
          'Comentarios/comentarios',
          {
            roles: session.usuario.roles,
            idAuto: id
          }
      )
    }else {
      return res.redirect('/login')
    }
  }

  @Post('comentarios/:id')
  async comentariosDesdeVista(
      @Res() res,
      @Session() session,
      @Param() parametrosRuta,
      @Body() parametrosCuerpo
  ){
    const estaLogeado = session.usuario;
    const id = Number(parametrosRuta.id);
    const puntuacionValida = new PuntuacionCreateDto();
    puntuacionValida.numero_estrellas = Number(parametrosCuerpo.numero_estrellas);
    puntuacionValida.comentario = parametrosCuerpo.comentario;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(puntuacionValida);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        res.redirect('/alquiler?error=Error validando datos');
      } else {
        const puntuacionData ={
          numero_estrellas: parametrosCuerpo.numero_estrellas,
          comentario: parametrosCuerpo.comentario,
          auto: id,
          usuario: session.usuario.userId
        }
        console.log(puntuacionData);
        respuesta = await this._puntuacionService.crearUno(puntuacionData);
      }
    } catch (error) {
      console.error(error);
      res.redirect('/alquiler?error=Error en el servidor')
    }

    if (respuesta) {
      const mensajeValido = 'La puntuacion se creo correctamente'
      return res.redirect('/alquiler?mensaje='+mensajeValido);
    } else {
      const mensajeError = 'Error creando puntuacion'
      return res.redirect('/alquiler?error=' + mensajeError);
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
