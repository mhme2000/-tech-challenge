import { ApiProperty } from '@nestjs/swagger';

export class AddOrUpdateCustomerDto {
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  document: string;
  @ApiProperty({
    type: String,
  })
  customerId?: string;
}
