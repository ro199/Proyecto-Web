import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfertaEntity } from './oferta.entity';

@Injectable()
export class OfertaService {
  constructor(
    @InjectRepository(OfertaEntity)
    private _repositorio: Repository<OfertaEntity>,
  ) {}
}
