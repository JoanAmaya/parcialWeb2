import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class EvaluacionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.evaluaciones)
  proyecto: ProyectoEntity;
  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.evaluaciones)
  profesor: ProfesorEntity;
}
