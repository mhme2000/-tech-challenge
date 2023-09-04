import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  categoryId: string;

  @ApiProperty({
    type: Number,
  })
  storeId: string;

  @ApiProperty({
    type: Number,
  })
  price: number;

  @ApiProperty({
    type: String,
  })
  description: string;

  @ApiProperty({
    type: String,
  })
  image: string;
}
