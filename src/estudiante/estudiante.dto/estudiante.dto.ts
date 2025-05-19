import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class EstudianteDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly cedula: number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber()
  @IsNotEmpty()
  readonly semestre: number;
  @IsNumber()
  @IsNotEmpty()
  readonly promedio: number;

  @IsString()
  @IsNotEmpty()
  readonly programa: string;
}
