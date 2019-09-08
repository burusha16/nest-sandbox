import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsInt()
  @Min(0)
  public readonly age: number;

  @IsString()
  @IsNotEmpty()
  public readonly breed: string;
}
