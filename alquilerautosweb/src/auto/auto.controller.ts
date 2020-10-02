import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Query, Res, Session, UploadedFile, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { AutoService } from './auto.service';
import { AutoCreateDto } from './dto/auto.create-dto';
import {AutoUpdateDto} from "./dto/auto.update-dto";
import {AutoEntity} from "./auto.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { v4 as uuidv4 } from "uuid"
import path from "path";
import {of} from "rxjs";
import e from "express";

@Controller()
export class AutoController {

  constructor(private readonly _autoService: AutoService) {}

  @Get('catalogo')
  async catalogo(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    let resultadoEncontrado;
    try{
      resultadoEncontrado = await this._autoService.buscarTodos();
    }catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error econtrando Autos'
      })
    }
    if(resultadoEncontrado){
      if(estaLogeado){
        return res.render(
            'catalogo/catalogo',
            {
              arregloAutos: resultadoEncontrado,
              roles: session.usuario.roles
            }
        );
      }else{
        return res.render(
            'catalogo/catalogo',
            {
              arregloAutos: resultadoEncontrado,
              roles: []
            }
        );
      }

    }else{
      throw new NotFoundException('No se enontraron Autos')
    }

  }

  @Get('administrador/catalogo')
  async administradorCatalogo(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      let resultadoEncontrado;
      try{
        resultadoEncontrado = await this._autoService.buscarTodos();
      }catch (e) {
        console.error(e);
        throw new InternalServerErrorException({
          mensaje: 'Error econtrando usuarios'
        })
      }
      if(resultadoEncontrado){
        res.render(
            'administrador/catalogo-administrador',
            {
              arregloAutos: resultadoEncontrado,
              roles: session.usuario.roles
            }
        );
      }else{
        throw new NotFoundException('No se enontraron usuarios')
      }
    }else{
      res.redirect('/login');
    }


  }

  @Get('administrador/catalogo/auto/crear')
  administradorCrearAuto(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return res.render(
          'administrador/crear-auto-administrador',
          {
            roles: session.usuario.roles
          }
      );
    }else{
      return res.redirect('/login')
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('source', {
    storage: diskStorage({
      destination: './publico/uploads',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, file.fieldname + '_' + Date.now() + '.jpg');
      }
    })
  }))
  uploadFile(@UploadedFile() file) {
    console.log(file.filename);
  }

  @Post('administrador/catalogo/auto/crear')
  async AdministradorCrearDesdeVistaAuto(
      @Body() parametrosCuerpo,
      @Res() res,
  ) {
    const autoValidado = new AutoCreateDto();
    autoValidado.nombre = parametrosCuerpo.nombre;
    autoValidado.numMotor = parametrosCuerpo.numMotor;
    autoValidado.precio = Number(parametrosCuerpo.precio);
    autoValidado.source = parametrosCuerpo.source;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(autoValidado);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        res.redirect('/administrador/catalogo/auto/crear?error=Error validando datos');
      } else {
        respuesta = await this._autoService.crearUno(parametrosCuerpo);
      }
    } catch (error) {
      console.error(error);
      res.redirect('/administrador/catalogo/auto/crear?error=Error en el servidor')
    }

    if (respuesta) {
      const mensajeValido = 'El auto se creo correctamente'
      return res.redirect('/administrador/catalogo?mensaje='+mensajeValido);
    } else {
      const mensajeError = 'Error creando auto'
      return res.redirect('/administrador/catalogo/auto/crear?error=' + mensajeError);
    }

  }

  @Get('administrador/catalogo/auto/editar/:id') // Controlador
  async editarUsuarioVista(
      @Res() res,
      @Query() parametrosConsulta,
      @Param() parametrosRuta,
      @Session() session
  ) {
    const estaLogeado = session.usuario;
    if(estaLogeado){
      const id = Number(parametrosRuta.id);
      let autoEncontrado;
      try{
        autoEncontrado = await this._autoService.buscarUno(id);
      }catch (e) {
        console.error('Error del servidor: ', e);
        return res.redirect('/administrador/catalogo?error=Error buscando automovil');
      }
      if(autoEncontrado){
        res.render(
            'administrador/actualizar-auto-administrador',
            {
              error: parametrosConsulta.error,
              auto: autoEncontrado,
              roles: session.usuario.roles
            }
        )
      }else{
        return res.redirect('/administrador/catalogo?error=Auto no encontrado')
      }
    }else{
      return res.redirect('/login')
    }

  }

  @Post('administrador/catalogo/auto/editar/:id')
  async AdministradorActualizarDesdeVistaAuto(
      @Param() parametrosRuta,
      @Body() parametrosCuerpo,
      @Res() res,
  ){
    console.log("Entre antes de autoUpdate");
    const autoValidado = new AutoUpdateDto();
    autoValidado.nombre = parametrosCuerpo.nombre;
    autoValidado.numMotor = parametrosCuerpo.numMotor;
    autoValidado.precio = Number(parametrosCuerpo.precio);
    autoValidado.source = parametrosCuerpo.source;
    let respuesta;
    try {
      const errores: ValidationError[] = await validate(autoValidado);
      if (errores.length > 0) {
        console.error('Errores: ', errores);
        res.redirect('/administrador/catalogo?error=Error validando datos');
      } else {
        console.log("Entre antes de autoEditado");
        const autoEditado = {
          id_autos: Number(parametrosRuta.id),
          nombre: parametrosCuerpo.nombre,
          numMotor: parametrosCuerpo.numMotor,
          precio: Number(parametrosCuerpo.precio),
          source: parametrosCuerpo.source,
        } as AutoEntity;
        respuesta = await this._autoService.editarUno(autoEditado);
      }
    } catch (error) {
      console.error(error);
      res.redirect('/administrador/catalogo?error=Error en el servidor');
    }

    if (respuesta) {
      const mensajeValido = 'El auto se actaalizo correctamente'
      return res.redirect('/administrador/catalogo?mensaje='+mensajeValido);
    } else {
      const mensajeError = 'Error actualizando auto'
      return res.redirect('/administrador/catalogo?error=' + mensajeError);
    }

  }

  @Post('administrador/catalogo/eliminar/:id')
  async eliminarAuto(
      @Param() parametrosRuta,
      @Res() res,
  ){
    try{
      const id = Number(parametrosRuta.id);
      await this._autoService.eliminarUno(id);
      return res.redirect('/administrador/catalogo?mensaje=Se ah eliminado correctamente el auto');
    }catch (e) {
      console.error(e);
      return res.redirect('/administrador/catalogo?error=Error eliminando el auto');
    }
  }

  @Get('rentar-auto/:id')
  async alquilarAuto(
      @Res() res,
      @Query() parametrosConsulta,
      @Param() parametrosRuta,
      @Session() session
  ) {
    const estaLogeado = session.usuario;
    if(estaLogeado){
      const id = Number(parametrosRuta.id);
      let autoEncontrado;
      try{
        autoEncontrado = await this._autoService.buscarUno(id);
      }catch (e) {
        console.error('Error del servidor: ', e);
        return res.redirect('/catalogo?error=Error buscando automovil');
      }
      if(autoEncontrado){
        res.render(
            'cliente/alquilar-auto',
            {
              error: parametrosConsulta.error,
              auto: autoEncontrado,
              roles: session.usuario.roles
            }
        )
      }else{
        return res.redirect('/catalogo?error=Auto no encontrado')
      }
    }else{
      return res.redirect('/login')
    }

  }

}
