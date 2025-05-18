import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
})
export class ProyectoModule {}
