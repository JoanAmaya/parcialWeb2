import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}
  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.presupuesto > 0 && proyecto.titulo.length > 15)
      return await this.proyectoRepository.save(proyecto);
    else
      throw new BusinessLogicException(
        'No se cumplen las precondiciones',
        BusinessError.PRECONDITION_FAILED,
      );
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const persistedProyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['estudiante'],
    });

    if (!persistedProyecto) {
      throw new BusinessLogicException(
        'No se encontro ',
        BusinessError.NOT_FOUND,
      );
    }
    if (persistedProyecto?.estado == 4)
      return await this.proyectoRepository.save(persistedProyecto);
    else {
      persistedProyecto.estado += 1;
      return await this.proyectoRepository.save(persistedProyecto);
    }
  }

  async findAll(idProyecto: number): Promise<EstudianteEntity> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: idProyecto },
      relations: ['estudiante'],
    });
    if (!proyecto) {
      throw new BusinessLogicException(
        'No se encontro el proyecto',
        BusinessError.NOT_FOUND,
      );
    }
    if (!proyecto.estudiante) {
      throw new BusinessLogicException(
        'No hay estudiantes',
        BusinessError.NOT_FOUND,
      );
    }
    return await proyecto.estudiante;
  }
}
