import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post, Query, Res, Session,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { RentaCreateDto } from './dto/renta.create-dto';
import { RentaService } from './renta.service';
import * as moment from "moment";
import {AutoService} from "../auto/auto.service";

@Controller()
export class RentaController {
  constructor(
      private readonly _rentaService: RentaService,
      private readonly _autoService: AutoService
  ) {}

  @Get('hh')
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
  async administradorAlquiler(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      let resultadoEncontrado;
      try{
        resultadoEncontrado = await this._rentaService.buscarTodos();
      }catch (e) {
        console.error(e);
        throw new InternalServerErrorException({
          mensaje: 'Error econtrando rentas'
        })
      }

      if(resultadoEncontrado){
        let respuestaAuto;
        try{
          respuestaAuto = await this._autoService.buscarUno(resultadoEncontrado.autoIdAutos);
        } catch (e) {
          console.error(e);
          throw new InternalServerErrorException({
            mensaje: 'Error al encontrar el Auto'
          })
        }

        if(respuestaAuto){
          res.render(
              'administrador/alquiler-administrador',
              {
                rentas: resultadoEncontrado,
                autos: respuestaAuto,
                roles: session.usuario.roles
              }
          );
        }else {
          throw new NotFoundException('No se enontraron autos')
        }
      }else{
        throw new NotFoundException('No se enontraron rentas')
      }
    }else {
      return res.redirect('/login');
    }
  }

  @Get('alquiler')
  async alquiler(
      @Res() res,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      let resultadoEncontrado;
      try{
        resultadoEncontrado = await this._rentaService.buscarTodos();
      }catch (e) {
        console.error(e);
        throw new InternalServerErrorException({
          mensaje: 'Error econtrando rentas'
        })
      }

      if(resultadoEncontrado){
        let respuestaAuto;
        try{
          respuestaAuto = await this._autoService.buscarUno(resultadoEncontrado.autoIdAutos);
        } catch (e) {
          console.error(e);
          throw new InternalServerErrorException({
            mensaje: 'Error al encontrar el Auto'
          })
        }

        if(respuestaAuto){
          res.render(
              'cliente/alquiler',
              {
                rentas: resultadoEncontrado,
                autos: respuestaAuto,
                roles: session.usuario.roles
              }
          );
        }else {
          throw new NotFoundException('No se enontraron autos')
        }
      }else{
        throw new NotFoundException('No se enontraron rentas')
      }
    }else {
      return res.redirect('/login');
    }
  }

  @Post('rentar-auto/:id')
  async alquilarDesdeVistaAuto(
      @Param() parametrosRuta,
      @Body() parametrosCuerpo,
      @Res() res,
      @Session() session
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
      const rentaValidada = new RentaCreateDto();
      rentaValidada.lugar_recogida = parametrosCuerpo.lugar_recogida;
      rentaValidada.lugar_entrega = parametrosCuerpo.lugar_entrega;
      rentaValidada.fecha_entrega = parametrosCuerpo.fecha_entrega;
      rentaValidada.fecha_recogida = parametrosCuerpo.fecha_recogida;
      rentaValidada.metodo_pago = parametrosCuerpo.metodo_pago;
      rentaValidada.estado = "Ocupado";
      let respuesta;
      try {
        const errores: ValidationError[] = await validate(rentaValidada);
        if (errores.length > 0) {
          console.error('Errores: ', errores);
          res.redirect('/catalogo?error=Error validando datos');
        } else {
          autoEncontrado = await this._autoService.buscarUno(id);
          const fecha1 = await moment(parametrosCuerpo.fecha_recogida);
          const fecha2 = await moment(parametrosCuerpo.fecha_entrega);
          const diferencia = await fecha2.diff(fecha1, 'days');
          const valorPagar = diferencia * autoEncontrado.precio;
          const rentaCreada = {
            total_pagar: Number(valorPagar),
            metodo_pago: parametrosCuerpo.metodo_pago,
            lugar_entrega: parametrosCuerpo.lugar_entrega,
            lugar_recogida: parametrosCuerpo.lugar_recogida,
            fecha_entrega: parametrosCuerpo.fecha_entrega,
            fecha_recogida: parametrosCuerpo.fecha_recogida,
            estado: "Ocupado",
            auto: autoEncontrado.id_autos,
            usuario: session.usuario.userId,
          };
          respuesta = await this._rentaService.crearUno(rentaCreada);
        }
      } catch (error) {
        console.error(error);
        res.redirect('/catalogo?error=Error en el servidor');
      }

      if (respuesta) {
        const mensajeValido = 'Felicidades has alquilado un automovil correctamente'
        return res.redirect('/alquiler?mensaje='+mensajeValido);
      } else {
        const mensajeError = 'Error alquilando el automovil'
        return res.redirect('/catalogo?error=' + mensajeError);
      }
    }else{
      return res.redirect('/catalogo?error=Auto no encontrado')
    }
  }



}
