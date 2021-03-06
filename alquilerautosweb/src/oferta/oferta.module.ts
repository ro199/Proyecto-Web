import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaController } from './oferta.controller';
import { OfertaEntity } from './oferta.entity';
import { OfertaService } from './oferta.service';
import {AutoModule} from "../auto/auto.module";

@Module({
  imports: [
      AutoModule,
    TypeOrmModule.forFeature([OfertaEntity], 'default')
  ],
  controllers: [OfertaController],
  providers: [OfertaService],
  exports: [
      OfertaService
  ]
})
export class OfertaModule {}
