import { Controller } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}
}
function UseInterceptors(
  BusinessErrorsInterceptor: any,
): (target: typeof ProfesorController) => void | typeof ProfesorController {
  throw new Error('Function not implemented.');
}
