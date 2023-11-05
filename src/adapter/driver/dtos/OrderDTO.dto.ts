import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class OrderItemDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  discount: number;
}

export class OrderDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  storeId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  customerId: string;

  @ApiProperty({ type: OrderItemDTO, isArray: true })
  orderItems: OrderItemDTO[];
}
