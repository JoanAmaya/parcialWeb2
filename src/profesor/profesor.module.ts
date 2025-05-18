import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { EstudianteModule } from 'src/estudiante/estudiante.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfesorEntity, EvaluacionEntity]),
    EstudianteModule,
  ],
  providers: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}
