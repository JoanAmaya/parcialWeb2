import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstudianteModule } from './estudiante/estudiante.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

// Importa tus entidades
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity/evaluacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'proyecto',
      entities: [
        EstudianteEntity,
        ProyectoEntity,
        ProfesorEntity,
        EvaluacionEntity,
      ],
      dropSchema: true, // solo para pruebas, NO en producción
      synchronize: true,
    }),
    EstudianteModule,
    ProyectoModule,
    ProfesorModule,
    EvaluacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
