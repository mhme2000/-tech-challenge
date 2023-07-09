import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({ name: 'category_id' })
  categoryId: string;
}
