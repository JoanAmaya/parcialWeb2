import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity/evaluacion.entity';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(
      getRepositoryToken(ProfesorEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un profesor correctamente si la extensión tiene 5 dígitos', async () => {
    const profesorEntity: ProfesorEntity = {
      id: 1,
      cedula: 12345,
      nombre: 'Carlos',
      departamento: 'Matemáticas',
      extension: 12345,
      esParEvaluador: true,
      proyectos: [],
      evaluaciones: [],
    };

    const nuevoProfesor = await service.crearProfesor(profesorEntity);
    const profesorBD = await repository.findOne({
      where: { id: nuevoProfesor.id },
    });

    expect(profesorBD).not.toBeNull();
    expect(profesorBD?.nombre).toBe(profesorEntity.nombre);
  });

  it('No debería poder crear un profesor', async () => {
    const profesorEntity: ProfesorEntity = {
      id: 1,
      cedula: 12345,
      nombre: 'Carlos',
      departamento: 'Matemáticas',
      extension: 1234,
      esParEvaluador: true,
      proyectos: [],
      evaluaciones: [],
    };

    await expect(service.crearProfesor(profesorEntity)).rejects.toHaveProperty(
      'message',
      'Error precondicion',
    );
  });

  it('debería asignar una evaluación si el profesor tiene menos de 3 evaluaciones', async () => {
    // Crear módulo incluyendo también el ProfesorService
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    const profesorRepo = module.get<Repository<ProfesorEntity>>(
      getRepositoryToken(ProfesorEntity),
    );
    const evaluacionRepo = module.get<Repository<EvaluacionEntity>>(
      getRepositoryToken(EvaluacionEntity),
    );
    const service = module.get<ProfesorService>(ProfesorService);

    // 1. Crear profesor sin evaluaciones
    const profesor = await profesorRepo.save({
      cedula: 123456789,
      nombre: 'Julio',
      departamento: 'Historia',
      extension: 12345,
      esParEvaluador: true,
    });

    // 2. Crear evaluación sin profesor asignado
    const evaluacion = await evaluacionRepo.save({});

    // 3. Ejecutar la asignación
    const profesorActualizado = await service.asignarEvaluador(
      profesor.id,
      evaluacion.id,
    );

    // 4. Verificar que la evaluación fue asignada correctamente
    expect(profesorActualizado.evaluaciones).toBeDefined();
    expect(profesorActualizado.evaluaciones.length).toBe(1);
    expect(profesorActualizado.evaluaciones[0].id).toBe(evaluacion.id);
  });

  it('No debería asignar evaluador', async () => {
    // Crear módulo incluyendo también el ProfesorService
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    const profesorRepo = module.get<Repository<ProfesorEntity>>(
      getRepositoryToken(ProfesorEntity),
    );
    const evaluacionRepo = module.get<Repository<EvaluacionEntity>>(
      getRepositoryToken(EvaluacionEntity),
    );
    const service = module.get<ProfesorService>(ProfesorService);

    // 1. Crear profesor sin evaluaciones
    const profesor = await profesorRepo.save({
      cedula: 123456789,
      nombre: 'Julio',
      departamento: 'Historia',
      extension: 12345,
      esParEvaluador: true,
    });

    // 2. Crear evaluación sin profesor asignado
    const evaluacion = await evaluacionRepo.save({});

    // 3. Ejecutar la asignación
    await service.asignarEvaluador(profesor.id, evaluacion.id);
    const evaluacion2 = await evaluacionRepo.save({});
    await service.asignarEvaluador(profesor.id, evaluacion2.id);
    const evaluacion3 = await evaluacionRepo.save({});
    await service.asignarEvaluador(profesor.id, evaluacion3.id);
    const evaluacion4 = await evaluacionRepo.save({});
    await expect(
      service.asignarEvaluador(profesor.id, evaluacion4.id),
    ).rejects.toHaveProperty(
      'message',
      'El profesor tiene mas de 3 evaluaciones',
    );
  });
});
