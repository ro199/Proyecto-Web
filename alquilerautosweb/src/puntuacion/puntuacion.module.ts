import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntuacionEntity } from './puntuacion.entity';
import { PuntuacionController } from './puntuacion.controller';
import { PuntuacionService } from './puntuacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([PuntuacionEntity], 'default')],
  controllers: [PuntuacionController],
  providers: [PuntuacionService],
})
export class PuntuacionModule {}
