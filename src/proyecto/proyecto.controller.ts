import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProyectoService } from './proyecto.service';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}
}
