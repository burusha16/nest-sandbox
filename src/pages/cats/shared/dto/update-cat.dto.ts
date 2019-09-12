import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateCatDto {
  @ValidateIf((obj, val) => !!val || Object.keys(obj).length === 0)
  @IsString()
  @ApiModelPropertyOptional({ example: 'timoshka' })
  public readonly name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiModelPropertyOptional({ example: 1 })
  public readonly age: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelPropertyOptional({ example: 'british' })
  public readonly breed: string;
}
