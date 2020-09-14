import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private _repositorio: Repository<UsuarioEntity>,
  ) {}

  crearUno(nuevoUsuario: UsuarioEntity) {
    return this._repositorio.save(nuevoUsuario);
  }

  buscarTodos() {
    return this._repositorio.find();
  }
}
