import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
// tslint:disable-next-line:no-any
export class DtoValidationPipe implements PipeTransform<any> {
  // tslint:disable-next-line:no-any
  public async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
  // tslint:disable-next-line:no-any
  private toValidate(metatype: Type<any>): boolean {
    // tslint:disable-next-line:no-any
    const types: Type<any>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
