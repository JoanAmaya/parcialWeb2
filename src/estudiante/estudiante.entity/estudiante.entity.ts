import {
Column,
PrimaryGeneratedColumn,
Entity,
OneToOne,
JoinColumn,
OneToMany,
} from 'typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
@Entity()
export class EstudianteEntity {
@PrimaryGeneratedColumn('increment')
id: number;
@Column()
cedula: number;
@Column()
nombre: string;
@Column()
semestre: number;
@Column()
programa: string;
@Column()
promedio: string;
@OneToMany(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
proyectos: ProyectoEntity[];

}