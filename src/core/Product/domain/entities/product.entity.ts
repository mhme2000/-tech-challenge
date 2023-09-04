import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @PrimaryColumn({ name: 'store_id' })
  storeId: string;

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'price',
  })
  price: number;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'image',
  })
  image: string;

  @Column({
    name: 'categoryId',
  })
  category: string;
}
