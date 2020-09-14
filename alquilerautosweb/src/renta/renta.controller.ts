import { Controller } from '@nestjs/common';
import { RentaService } from './renta.service';

@Controller('renta')
export class RentaController {
  constructor(private readonly _rentaService: RentaService) {}
}
