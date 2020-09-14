import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuntuacionEntity } from './puntuacion.entity';

@Injectable()
export class PuntuacionService {
  constructor(
    @InjectRepository(PuntuacionEntity)
    private _repositorio: Repository<PuntuacionEntity>,
  ) {}
}
