import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';
import { ProyectoService } from '../proyecto/proyecto.service';
describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(
      getRepositoryToken(EstudianteEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Prueba crear estudiante', async () => {
    const estudianteEntity: EstudianteEntity = {
      cedula: 112321321,
      nombre: 'JuanMiguel',
      programa: 'fisica',
      promedio: 4,
      semestre: 4,
      proyectos: [],
      id: 1,
    };
    const newEstudiante: EstudianteEntity =
      await service.crearEstudiante(estudianteEntity);
    expect(newEstudiante).not.toBeNull();
    const storedEstudiante = await repository.findOne({
      where: { id: newEstudiante.id },
    });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante?.nombre).toEqual(newEstudiante.nombre);
    expect(storedEstudiante?.cedula).toEqual(newEstudiante.cedula);
    expect(storedEstudiante?.programa).toEqual(newEstudiante.programa);
    expect(storedEstudiante?.promedio).toEqual(newEstudiante.promedio);
    expect(storedEstudiante?.semestre).toEqual(newEstudiante.semestre);
  });

  it('debería lanzar una excepción si el promedio o semestre no cumple los requisitos', async () => {
  const estudianteEntity: EstudianteEntity = {
    cedula: 123456789,
    nombre: 'Carlos',
    programa: 'Ingeniería',
    promedio: 3.0, // menor a 3.2
    semestre: 4,
    proyectos: [],
    id: 2,
  };

  await expect(service.crearEstudiante(estudianteEntity)).rejects.toHaveProperty(
    'message',
    'El codigo del estudiante no tiene 10 caracteres',
  );
});

it('debería eliminar el estudiante si no tiene proyectos', async () => {
  const estudiante: EstudianteEntity = await repository.save({
    cedula: 987654321,
    nombre: 'Ana',
    programa: 'Matemáticas',
    promedio: 3.5,
    semestre: 5,
    proyectos: [],
  });

  await service.eliminarEstudiante(estudiante.id);

  const result = await repository.findOne({ where: { id: estudiante.id } });
  expect(result).toBeNull();
});
it('debería lanzar una excepción si el estudiante tiene proyectos activos', async () => {
  // Crear módulo incluyendo también el EstudianteService
  const module: TestingModule = await Test.createTestingModule({
    imports: [...TypeOrmTestingConfig()],
    providers: [EstudianteService],
  }).compile();

  const proyectoRepo = module.get<Repository<ProyectoEntity>>(
    getRepositoryToken(ProyectoEntity),
  );
  const estudianteRepo = module.get<Repository<EstudianteEntity>>(
    getRepositoryToken(EstudianteEntity),
  );
  const service = module.get<EstudianteService>(EstudianteService);

  // 1. Crear estudiante
  const estudiante = await estudianteRepo.save({
    cedula: 111111111,
    nombre: 'Luis',
    programa: 'Matemáticas',
    promedio: 4.5,
    semestre: 6,
  });

  // 2. Crear proyecto con relación al estudiante
  await proyectoRepo.save({
    titulo: 'Proyecto A',
    area: 'Física',
    presupuesto: 10000,
    notaFinal: 4.5,
    estado: 1,
    fechaInicio: 20230101,
    fechaFin: 20231231,
    estudiante: estudiante, // relación aquí es suficiente
  });

  // 3. Recargar estudiante con relación `proyectos`
  const estudianteRecargado = await estudianteRepo.findOne({
    where: { id: estudiante.id },
    relations: ['proyectos'],
  });

  // Verifica que efectivamente tenga proyectos
  expect(estudianteRecargado?.proyectos.length).toBeGreaterThan(0);

  // 4. Ejecuta la prueba
  await expect(
    service.eliminarEstudiante(estudiante.id),
  ).rejects.toHaveProperty('message', 'estudiante con proyectos activos');
});

});
