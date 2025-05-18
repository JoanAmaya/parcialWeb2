import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
export class ProyectoDto {
  @IsNotEmpty()
  @IsString()
  readonly titulo: string;
  @IsNotEmpty()
  @IsString()
  readonly area: string;
  @IsNotEmpty()
  @IsNumber()
  readonly presupuesto: number;
  @IsNotEmpty()
  @IsNumber()
  readonly notaFinal: number;
  @IsNotEmpty()
  @IsNumber()
  readonly estado: number;
  @IsNotEmpty()
  @IsNumber()
  readonly fechaInicio: number;
  @IsNotEmpty()
  @IsNumber()
  readonly fechaFin: number;
}
