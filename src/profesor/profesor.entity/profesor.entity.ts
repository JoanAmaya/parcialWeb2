import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity/evaluacion.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  cedula: number;
  @Column()
  nombre: string;
  @Column()
  departamento: string;
  @Column()
  extension: number;
  @Column()
  esParEvaluador: boolean;
  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.profesor)
  proyectos: ProyectoEntity[];
  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.profesor)
  evaluaciones: EvaluacionEntity[];
}
