import { Controller } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';

@Controller('puntuacion')
export class PuntuacionController {
  constructor(private readonly _puntuacionService: PuntuacionService) {}
}
