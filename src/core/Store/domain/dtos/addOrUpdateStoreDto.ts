import { ApiProperty } from '@nestjs/swagger';

export class AddOrUpdateStoreDto {
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  description: string;
  @ApiProperty({
    type: String,
  })
  storeId?: string;
}
