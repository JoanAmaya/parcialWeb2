import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity/evaluacion.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  titulo: string;
  @Column()
  area: string;
  @Column()
  presupuesto: number;
  @Column()
  notaFinal: number;
  @Column()
  estado: number;
  @Column()
  fechaInicio: number;
  @Column()
  fechaFin: number;
  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos, {
    nullable: true,
  })
  estudiante?: EstudianteEntity;
  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.proyectos, {
    nullable: true,
  })
  profesor?: ProfesorEntity;
  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
  evaluaciones: EvaluacionEntity[];
}
