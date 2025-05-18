import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
jest.setTimeout(30000);
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
});
