import { ApiModelProperty } from '@nestjs/swagger';

export class IdModel {
  @ApiModelProperty({example: '5d79608c48804f12c59edfc4'})
  public _id: string;

  // @ts-ignore
  constructor(public _id: string) {
  }
}
