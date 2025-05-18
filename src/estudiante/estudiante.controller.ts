import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteDTO } from './estudiante.dto/estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}
  @Post()
  async create(@Body() estudianteDTO: EstudianteDTO) {
    const estudiante = plainToInstance(EstudianteEntity, estudianteDTO);
    return await this.estudianteService.crearEstudiante(estudiante);
  }
  @Delete(':estudianteId')
  @HttpCode(204)
  async delete(@Param('estudianteId') estudianteId: number) {
    return await this.estudianteService.eliminarEstudiante(estudianteId);
  }
}
