import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Query, Res,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { AutoService } from './auto.service';
import { AutoCreateDto } from './dto/auto.create-dto';
import {AutoUpdateDto} from "./dto/auto.update-dto";
import {AutoEntity} from "./auto.entity";

@Controller()
export class AutoController {

  constructor(private readonly _autoService: AutoService) {}

  @Get('catalogo')
  faq(@Res() res){
    console.log("entre al autos catalogo")
    res.render('catalogo/catalogo')
  }

  @Get('administrador/catalogo')
  async administradorCatalogo(
      @Res() res,
  ){
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
          }
      );
    }else{
      throw new NotFoundException('No se enontraron usuarios')
    }

  }

  @Get('administrador/catalogo/auto/crear')
  administradorCrearAuto(
      @Res() res
  ){
    res.render('administrador/crear-auto-administrador')
  }

  @Post('administrador/catalogo/auto/crearAuto')
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
  ) {
    const id = Number(parametrosRuta.id);
    let autoEncontrado;
    try{
      autoEncontrado = await this._autoService.buscarUno(id);
    }catch (e) {
      console.error('Error del servidor: ', e);
      return res.redirect('/administrador/catalogo?error=Error buscando usuario');
    }
    if(autoEncontrado){
      res.render(
          'administrador/actualizar-auto-administrador',
          {
            error: parametrosConsulta.error,
            auto: autoEncontrado,
          }
      )
    }else{
      return res.redirect('/administrador/catalogo?error=Auto no encontrado')
    }
  }

  @Post('administrador/catalogo/auto/editar/editarVista/:id')
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

}
