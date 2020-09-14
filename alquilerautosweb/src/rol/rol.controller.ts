import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get()
  async mostraTodos() {
    try {
      return await this._rolService.buscarTodos();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }
}
