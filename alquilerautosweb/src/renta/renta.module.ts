import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentaEntity } from './renta.entity';
import { RentaController } from './renta.controller';
import { RentaService } from './renta.service';

@Module({
  imports: [TypeOrmModule.forFeature([RentaEntity], 'default')],
  controllers: [RentaController],
  providers: [RentaService],
})
export class RentaModule {}
