import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionEntity: Repository<EvaluacionEntity>,
  ) {}
  async crearEvaluación(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    if (profesor.extension.toString.length == 5)
      return await this.profesorRepository.save(profesor);
    else
      throw new BusinessLogicException(
        'Error precondicion',
        BusinessError.PRECONDITION_FAILED,
      );
  }
  async asignarEvaluador(
    idProfesor: number,
    idEvaluacion: number,
  ): Promise<ProfesorEntity> {
    const profesorEntity = await this.profesorRepository.findOne({
      where: { id: idProfesor },
    });
    if (!profesorEntity) {
      throw new BusinessLogicException(
        'No se encontro el profesor con ese id',
        BusinessError.NOT_FOUND,
      );
    }
    const evaluacionEntity = await this.evaluacionEntity.findOne({
      where: { id: idEvaluacion },
    });
    if (!evaluacionEntity) {
      throw new BusinessLogicException(
        'No se encontro la evaluación con ese id',
        BusinessError.NOT_FOUND,
      );
    }
    if (profesorEntity.evaluaciones.length > 3) {
      throw new BusinessLogicException(
        'El profesor tiene mas de 3 evaluaciones',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    profesorEntity.evaluaciones.push(evaluacionEntity);
    await this.profesorRepository.save(profesorEntity);

    return profesorEntity;
  }
}
