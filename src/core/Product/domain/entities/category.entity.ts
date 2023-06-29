import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'description'
  })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]

  // TODO Criar script para popular tabela de categoria
}
