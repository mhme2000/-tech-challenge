import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  categoryId: string;
  @ApiProperty({
    type: String,
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
  @ApiProperty({
    type: String,
  })
  productId: string;
}
