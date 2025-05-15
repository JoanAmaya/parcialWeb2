import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, OneToMany } from 'typeorm';
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
  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.proyectos)
  estudiante: EstudianteEntity;
  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.proyectos)
  profesor: ProfesorEntity;
  @OneToMany(() => EvaluacionEntity, (evaluacion) => evaluacion.proyecto)
        evaluaciones: EvaluacionEntity[];
}