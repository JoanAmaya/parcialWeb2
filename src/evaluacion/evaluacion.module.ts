import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionEntity])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
})
export class EvaluacionModule {}
