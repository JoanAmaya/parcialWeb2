import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}
  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    if (estudiante.promedio > 3.2 && estudiante.semestre >= 4)
      return await this.estudianteRepository.save(estudiante);
    else
      throw new BusinessLogicException(
        'El codigo del estudiante no tiene 10 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
  }

  async eliminarEstudiante(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });
    if (!estudiante)
      throw new BusinessLogicException(
        'The estudiante with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (estudiante.proyectos.length > 0)
      throw new BusinessLogicException(
        'estudiante con proyectos activos',
        BusinessError.PRECONDITION_FAILED,
      );
    await this.estudianteRepository.remove(estudiante);
  }
}
