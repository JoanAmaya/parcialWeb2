import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class EvaluacionService {
    constructor(
            @InjectRepository(EvaluacionEntity)
            private readonly evaluacionRepository: Repository<EvaluacionEntity>,
        ) {}
        async crearEvaluación(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity> {
            if (evaluacion.profesor.cedula!= evaluacion.proyecto.estudiante.cedula && evaluacion.proyecto.notaFinal>=0 && evaluacion.proyecto.notaFinal<=5)
              return await this.evaluacionRepository.save(evaluacion);
            else
              throw new BusinessLogicException(
                'Error precondicion',
                BusinessError.PRECONDITION_FAILED,
              );
          }
}
