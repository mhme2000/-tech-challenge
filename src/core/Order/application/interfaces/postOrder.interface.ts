import { OrderDTO } from 'src/adapter/driver/dtos/OrderDTO.dto';

export interface IPostOrder {
  postOrder(orderDto: OrderDTO): Promise<string>;
}
