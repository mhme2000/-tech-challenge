import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;

}
