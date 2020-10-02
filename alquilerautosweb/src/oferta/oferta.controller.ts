import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException, NotFoundException, Param,
  Post, Res, Session,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { OfertaCreateDto } from './dto/oferta.create-dto';
import { OfertaService } from './oferta.service';
import * as moment from "moment";
import {RentaCreateDto} from "../renta/dto/renta.create-dto";
import {AutoService} from "../auto/auto.service";
import {OfertaEntity} from "./oferta.entity";

@Controller()
export class OfertaController {
  constructor(
      private readonly _ofertaService: OfertaService,
      private readonly _autoService: AutoService
  ) {}

  @Get('of')
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

  @Get('ofertas')
  async oferta(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    let resultadoEncontrado;
    try{
      resultadoEncontrado = await this._ofertaService.buscarTodos();
    }catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error econtrando ofertas'
      })
    }
    if(resultadoEncontrado){
      const autos = await resultadoEncontrado.map((auto) => auto.autos);
      console.log(autos[0].nombre);
      if(estaLogeado){
        res.render('ofertas/oferta',
            {
              arregloOfertas: resultadoEncontrado,
              roles: session.usuario.roles,
              autos: autos
            }
        );
      }else{
        res.render('ofertas/oferta',
            {
              arregloOfertas: resultadoEncontrado,
              roles: [],
              autos: autos
            }
        );
      }
    }else{
      throw new NotFoundException('No se enontraron ofertas');
    }

  }

  @Get('administrador/oferta')
  async administradorOferta(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      const estaLogeado = session.usuario;
      let resultadoEncontrado;
      try{
        resultadoEncontrado = await this._ofertaService.buscarTodos();
      }catch (e) {
        console.error(e);
        throw new InternalServerErrorException({
          mensaje: 'Error econtrando ofertas'
        })
      }
      if(resultadoEncontrado) {
        const autos = await resultadoEncontrado.map((auto) => auto.autos);
        console.log(autos[0].nombre);
        res.render(
            'administrador/oferta-administrador',
            {
              roles: session.usuario.roles,
              autos: autos,
              arregloOfertas: resultadoEncontrado
            }
        );
      }else{
        throw new NotFoundException('No se enontraron ofertas');
      }
    }else{
      return res.redirect('/login');
    }

  }

  @Get('administrador/oferta/crear/:id')
  administradorCrearAutoOferta(
      @Res() res,
      @Session() session,
      @Param() parametrosRuta
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      const id = Number(parametrosRuta.id);
      res.render(
          'administrador/crear-oferta-administrador',
          {
            roles: session.usuario.roles,
            idAuto: id
          }
      );
    }else{
      return res.redirect('/login');
    }
  }

  @Post('administrador/oferta/crear/:id')
  async administradorCrearDesdeAutoOferta(
      @Res() res,
      @Session() session,
      @Param() parametrosRuta,
      @Body() parametrosCuerpo,
  ){
    const id = Number(parametrosRuta.id);
    let autoEncontrado;
    try{
      autoEncontrado = await this._autoService.buscarUno(id);
    }catch (e) {
      console.error('Error del servidor: ', e);
      return res.redirect('/catalogo?error=Error buscando automovil');
    }
    if(autoEncontrado){
      const ofertavalida = new OfertaCreateDto();
      ofertavalida.nombre = parametrosCuerpo.nombre;
      ofertavalida.descripcion = parametrosCuerpo.descripcion;
      ofertavalida.porcentaje = parametrosCuerpo.porcentaje;
      ofertavalida.link_web = parametrosCuerpo.link_web;
      ofertavalida.fecha_inicio = parametrosCuerpo.fecha_inicio;
      ofertavalida.fecha_fin = parametrosCuerpo.fecha_fin;
      let respuesta;
      try {
        const errores: ValidationError[] = await validate(ofertavalida);
        if (errores.length > 0) {
          console.error('Errores: ', errores);
          res.redirect('/administrador/catalogo?error=Error validando datos');
        } else {
          const porcentaje = autoEncontrado.precio * parametrosCuerpo.porcentaje;
          const valorPagar = autoEncontrado.precio - porcentaje;
          const ofertaCreada = {
            nombre: parametrosCuerpo.nombre,
            descripcion: parametrosCuerpo.descripcion,
            porcentaje: Number(parametrosCuerpo.porcentaje),
            link_web: parametrosCuerpo.link_web,
            fecha_inicio: parametrosCuerpo.fecha_inicio,
            fecha_fin: parametrosCuerpo.fecha_fin,
            valor: valorPagar,
            autos: autoEncontrado.id_autos,
          } as OfertaEntity;
          respuesta = await this._ofertaService.crearUno(ofertaCreada);
        }
      } catch (error) {
        console.error(error);
        res.redirect('/administrador/catalogo?error=Error en el servidor');
      }

      if (respuesta) {
        const mensajeValido = 'Felicidades has creado una oferta'
        return res.redirect('/administrador/oferta?mensaje='+mensajeValido);
      } else {
        const mensajeError = 'Error creando una oferta'
        return res.redirect('/administrador/catalogo?error=' + mensajeError);
      }
    }else{
      return res.redirect('/administrador/catalogo?error=Auto no encontrado')
    }
  }

  @Post('administrador/oferta/eliminar-oferta/:id')
  async eliminarOferta(
      @Res() res,
      @Param() parametrosRuta
  ){
    try{
      const id = Number(parametrosRuta.id);
      await this._ofertaService.eliminarUno(id);
      return res.redirect('/administrador/oferta?mensaje=Se ah eliminado correctamente la oferta');
    }catch (e) {
      console.error(e);
      return res.redirect('/administrador/oferta?error=Error eliminando la oferta');
    }

  }
}
