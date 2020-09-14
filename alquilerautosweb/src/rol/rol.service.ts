import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolEntity)
    private _repositorio: Repository<RolEntity>,
  ) {}
}
