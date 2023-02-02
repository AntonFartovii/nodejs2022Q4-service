import { validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export function validateUUIDV4( id: string): void {
  if (!uuidValidate(id)) {
    throw new HttpException('It is wrong ID UUIDV4', HttpStatus.BAD_REQUEST);
  }
}

