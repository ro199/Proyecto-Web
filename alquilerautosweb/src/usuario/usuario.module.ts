import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import {PuntuacionModule} from "../puntuacion/puntuacion.module";
import {RentaModule} from "../renta/renta.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([UsuarioEntity], 'default'),
  ],
  controllers: [UsuarioController],
  providers: [
      UsuarioService
  ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule {}
