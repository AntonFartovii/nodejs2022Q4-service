import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  constructor(private schema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException('Invalid property', HttpStatus.BAD_REQUEST);
    }
    return value
  }
}
