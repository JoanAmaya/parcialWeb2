import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
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
  esParEvaluadro: boolean;
  @OneToMany(() => ProyectoEntity, (proyecto) => proyecto.profesor)
  proyectos: ProyectoEntity[];
  
}