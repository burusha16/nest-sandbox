import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({example: 'timoshka'})
  public readonly name: string;

  @IsInt()
  @Min(0)
  @ApiModelProperty({example: 1})
  public readonly age: number;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({example: 'british'})
  public readonly breed: string;
}
