import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ProfesorService {
        constructor(
                @InjectRepository(ProfesorEntity)
                private readonly profesorRepository: Repository<ProfesorEntity>,
            ) {}
            async crearEvaluación(profesor: ProfesorEntity): Promise<ProfesorEntity> {
                if (profesor.extension.toString.length==5)
                  return await this.profesorRepository.save(profesor);
                else
                  throw new BusinessLogicException(
                    'Error precondicion',
                    BusinessError.PRECONDITION_FAILED,
                  );
              }
    }

