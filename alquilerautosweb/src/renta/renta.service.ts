import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentaEntity } from './renta.entity';

@Injectable()
export class RentaService {
  constructor(
    @InjectRepository(RentaEntity)
    private _repositorio: Repository<RentaEntity>,
  ) {}
}
