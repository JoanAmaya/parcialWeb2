import { ProyectoEntity } from "src/proyecto/proyecto.entity/proyecto.entity";
import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class EvaluacionEntity {
      @PrimaryGeneratedColumn('increment')
      id: number;
      @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.evaluaciones)
      proyecto: ProyectoEntity;
      

}
