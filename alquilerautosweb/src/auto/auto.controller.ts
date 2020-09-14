import { Controller } from '@nestjs/common';
import { AutoService } from './auto.service';

@Controller('autos')
export class AutoController {
  constructor(private readonly _autoService: AutoService) {}
}
