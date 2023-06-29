import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'description'
  })
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category
  //TODO Adicionar colunas restantes
}
