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
}
