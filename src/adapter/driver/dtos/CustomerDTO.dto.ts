import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Validate,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCPF } from '../validators';

export class CustomerDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @Validate(IsCPF)
  @MaxLength(11)
  @MinLength(11)
  @ApiProperty({ type: String })
  document: string;
}
