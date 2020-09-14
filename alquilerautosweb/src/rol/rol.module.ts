import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolController } from './rol.controller';
import { RolEntity } from './rol.entity';
import { RolService } from './rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity], 'default')],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
