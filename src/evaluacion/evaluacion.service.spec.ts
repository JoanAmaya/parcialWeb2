import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let repository: Repository<EvaluacionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repository = module.get<Repository<EvaluacionEntity>>(
      getRepositoryToken(EvaluacionEntity),
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('debería crear una evaluación si el proyecto no tiene estudiante', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    const evaluacionRepo = module.get<Repository<EvaluacionEntity>>(
      getRepositoryToken(EvaluacionEntity),
    );

    const service = module.get<EvaluacionService>(EvaluacionService);
    const evaluacionEntity = new EvaluacionEntity();
    const evaluacion = await service.crearEvaluación(evaluacionEntity);

    expect(evaluacion).toBeDefined();
  });
});
