import { Module } from '@nestjs/common';
import { from } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfertaModule } from './oferta/oferta.module';
import { PuntuacionModule } from './puntuacion/puntuacion.module';
import { RentaModule } from './renta/renta.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutoModule } from './auto/auto.module';

@Module({
  imports: [
    UsuarioModule,
    RolModule,
    PuntuacionModule,
    RentaModule,
    OfertaModule,
    AutoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
