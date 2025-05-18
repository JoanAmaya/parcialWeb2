import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { plainToInstance } from 'class-transformer';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}
  @Post()
  async create(@Body() proyectoDto: ProyectoDto) {
    const proyecto = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.crearProyecto(proyecto);
  }
  @Put(':proyectoId')
  async avanzar(@Param('proyectoId') proyectoId: string) {
    return await this.proyectoService.avanzarProyecto(+proyectoId);
  }
  @Get(':proyectoId')
  async estudiantes(@Param('proyectoId') proyectoId: string) {
    return await this.proyectoService.findAll(+proyectoId);
  }
}
