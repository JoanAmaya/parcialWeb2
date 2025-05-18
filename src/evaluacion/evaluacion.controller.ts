import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluacion')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}
}
