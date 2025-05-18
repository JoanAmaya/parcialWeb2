import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(
      getRepositoryToken(ProyectoEntity),
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('debería crear un proyecto si se cumplen las condiciones', async () => {
    const proyecto: ProyectoEntity = {
      id: 1,
      titulo: 'Proyecto de investigación avanzada',
      area: 'Física',
      presupuesto: 10000,
      notaFinal: 4.5,
      estado: 1,
      fechaInicio: 20230101,
      fechaFin: 20231231,
      estudiante: undefined,
      profesor: undefined,
      evaluaciones: [],
    };

    const resultado = await service.crearProyecto(proyecto);
    const proyectoBD = await repository.findOne({
      where: { id: resultado.id },
    });

    expect(proyectoBD).not.toBeNull();
    expect(proyectoBD?.titulo).toBe(proyecto.titulo);
  });

  it('No debería crear un proyecto si no se cumplen las condiciones', async () => {
    const proyecto: ProyectoEntity = {
      id: 1,
      titulo: 'Proyecto de investigación avanzada',
      area: 'Física',
      presupuesto: 0,
      notaFinal: 4.5,
      estado: 1,
      fechaInicio: 20230101,
      fechaFin: 20231231,
      estudiante: undefined,
      profesor: undefined,
      evaluaciones: [],
    };

    await expect(service.crearProyecto(proyecto)).rejects.toHaveProperty(
      'message',
      'No se cumplen las precondiciones',
    );
  });
  it('debería avanzar el estado del proyecto si estado < 4', async () => {
    const proyecto = await repository.save({
      titulo: 'Proyecto largo de prueba',
      area: 'Ingeniería',
      presupuesto: 20000,
      notaFinal: 4.8,
      estado: 2,
      fechaInicio: 20220101,
      fechaFin: 20231231,
      estudiante: undefined,
      profesor: undefined,
      evaluaciones: [],
    });

    const actualizado = await service.avanzarProyecto(proyecto.id);

    expect(actualizado.estado).toBe(3);
  });
  it('debería lanzar error si el proyecto no existe', async () => {
    await expect(service.avanzarProyecto(999)).rejects.toHaveProperty(
      'message',
      'No se encontro ',
    );
  });
  it('debería lanzar error si el proyecto no tiene estudiante', async () => {
    const proyecto = await repository.save({
      titulo: 'Proyecto sin estudiante',
      area: 'Matemáticas',
      presupuesto: 5000,
      notaFinal: 4.0,
      estado: 1,
      fechaInicio: 20230101,
      fechaFin: 20231231,
      estudiante: undefined,
      profesor: undefined,
      evaluaciones: [],
    });

    await expect(service.findAll(proyecto.id)).rejects.toHaveProperty(
      'message',
      'No hay estudiantes',
    );
  });
  it('debería retornar el estudiante asociado al proyecto', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    const proyectoRepo = module.get<Repository<ProyectoEntity>>(
      getRepositoryToken(ProyectoEntity),
    );

    const estudianteRepo = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );

    const service = module.get<ProyectoService>(ProyectoService);

    // 1. Crear estudiante
    const estudiante = await estudianteRepo.save({
      cedula: 987654321,
      nombre: 'Laura',
      programa: 'Ingeniería Química',
      promedio: 4.6,
      semestre: 7,
    });

    // 2. Crear proyecto con relación al estudiante
    const proyecto = await proyectoRepo.save({
      titulo: 'Proyecto con estudiante asignado',
      area: 'Biotecnología',
      presupuesto: 15000,
      notaFinal: 4.8,
      estado: 2,
      fechaInicio: 20230101,
      fechaFin: 20231231,
      estudiante: estudiante,
      profesor: undefined,
      evaluaciones: [],
    });

    // 3. Ejecutar servicio
    const resultado = await service.findAll(proyecto.id);

    // 4. Verificación
    expect(resultado).toBeDefined();
    expect(resultado.nombre).toBe(estudiante.nombre);
  });
});
