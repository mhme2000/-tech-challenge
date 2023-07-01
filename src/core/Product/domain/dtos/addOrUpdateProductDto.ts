import { ApiProperty } from "@nestjs/swagger";

export class AddOrUpdateProductDto {
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
  categoryId: string;
  @ApiProperty({
    type: String,
  })
  productId?: string;
}
