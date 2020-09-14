import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaController } from './oferta.controller';
import { OfertaEntity } from './oferta.entity';
import { OfertaService } from './oferta.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfertaEntity], 'default')],
  controllers: [OfertaController],
  providers: [OfertaService],
})
export class OfertaModule {}
