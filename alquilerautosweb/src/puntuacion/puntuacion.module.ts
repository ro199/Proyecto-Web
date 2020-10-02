import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntuacionEntity } from './puntuacion.entity';
import { PuntuacionController } from './puntuacion.controller';
import { PuntuacionService } from './puntuacion.service';
import {UsuarioModule} from "../usuario/usuario.module";
import {AutoModule} from "../auto/auto.module";

@Module({
  imports: [
      UsuarioModule,
      TypeOrmModule.forFeature([PuntuacionEntity], 'default')
  ],
  controllers: [PuntuacionController],
  providers: [PuntuacionService],
  exports: [PuntuacionService]
})
export class PuntuacionModule {}
