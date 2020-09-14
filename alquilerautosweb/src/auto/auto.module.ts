import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoEntity } from './auto.entity';
import { AutoController } from './auto.controller';
import { AutoService } from './auto.service';

@Module({
  imports: [TypeOrmModule.forFeature([AutoEntity], 'default')],
  controllers: [AutoController],
  providers: [AutoService],
})
export class AutoModule {}
