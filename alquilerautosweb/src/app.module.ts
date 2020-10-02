import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfertaModule } from './oferta/oferta.module';
import { PuntuacionModule } from './puntuacion/puntuacion.module';
import { RentaModule } from './renta/renta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutoModule } from './auto/auto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { PuntuacionEntity } from './puntuacion/puntuacion.entity';
import { RentaEntity } from './renta/renta.entity';
import { OfertaEntity } from './oferta/oferta.entity';
import { AutoEntity } from './auto/auto.entity';

@Module({
  imports: [
    UsuarioModule,
    PuntuacionModule,
    RentaModule,
    OfertaModule,
    AutoModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'EPNdth2020',
      database: 'alquilerwb',
      entities: [
        UsuarioEntity,
        PuntuacionEntity,
        RentaEntity,
        OfertaEntity,
        AutoEntity,
      ],
      synchronize: true,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
