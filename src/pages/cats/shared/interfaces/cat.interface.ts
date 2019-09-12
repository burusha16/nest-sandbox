import { ApiModelProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export interface ICatDocument extends ICat, Document {
  _id: string;
}

export class ICat {
  @ApiModelProperty({example: 'timoshka'})
  public name: string;

  @ApiModelProperty({example: 1})
  public age: number;

  @ApiModelProperty({example: 'british'})
  public breed: string;

  @ApiModelProperty({example: '5d79608c48804f12c59edfc4'})
  public _id: string;
}
