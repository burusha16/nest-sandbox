import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateCatDto {
  @ValidateIf((obj, val) => !!val || Object.keys(obj).length === 0)
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  public readonly age: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly breed: string;
}
