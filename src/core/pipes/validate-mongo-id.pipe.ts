import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'bson';

export class ValidateMongoIdPipe implements PipeTransform<string, string> {
  public transform(value: string, { metatype }: ArgumentMetadata): string {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid id format');
    }
    return value;
  }
}
