import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoEntity } from './auto.entity';
@Injectable()
export class AutoService {
  constructor(
    @InjectRepository(AutoEntity)
    private _repositorio: Repository<AutoEntity>,
  ) {}

  buscarTodos() {
    return this._repositorio.find();
  }

  crearUno(nuevoAuto: AutoEntity) {
    return this._repositorio.save(nuevoAuto);
  }
}
