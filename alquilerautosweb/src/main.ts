import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)) as any;
  app.set('view engine', 'ejs');
  app.set(express.static('public'));
  await app.listen(3000);
}
bootstrap();
