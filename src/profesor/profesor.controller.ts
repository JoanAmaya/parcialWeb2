import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { plainToInstance } from 'class-transformer';
import { ProfesorEntity } from './profesor.entity/profesor.entity';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}
  @Post()
  async create(@Body() profesorDto: ProfesorDto) {
    const profesor = plainToInstance(ProfesorEntity, profesorDto);
    return await this.profesorService.crearProfesor(profesor);
  }
  @Post(':profesorId/:evaluadorId')
  async createEvaluador(
    @Param('profesorId') profesorId: string,
    @Param('evaluadorId') evaluadorId: string,
  ) {
    return await this.profesorService.asignarEvaluador(
      +profesorId,
      +evaluadorId,
    );
  }
}
