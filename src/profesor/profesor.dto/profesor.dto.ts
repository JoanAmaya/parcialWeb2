import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
export class ProfesorDto {
  @IsNotEmpty()
  @IsNumber()
  readonly cedula: number;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly departamento: string;

  @IsNotEmpty()
  @IsNumber()
  readonly extension: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly esParEvaluador: boolean;
}
