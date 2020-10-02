import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentaEntity } from './renta.entity';
import { RentaController } from './renta.controller';
import { RentaService } from './renta.service';
import {AutoModule} from "../auto/auto.module";

@Module({
  imports: [
      AutoModule,
      TypeOrmModule.forFeature([RentaEntity], 'default')
  ],
  controllers: [RentaController],
  providers: [RentaService],
    exports: [RentaService]
})
export class RentaModule {}
